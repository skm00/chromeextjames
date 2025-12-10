let selectedTabs = new Set();

// Add this migration function at the start of your code
function migrateOldCollections() {
    chrome.storage.local.get("collections", (data) => {
        if (!data.collections) return;

        const needsMigration = data.collections.some(c => !c.bookmarks && c.urls);
        if (!needsMigration) return;

        const migrated = data.collections.map(collection => {
            if (collection.bookmarks) return collection; // Already new format
            
            return {
                name: collection.name,
                bookmarks: collection.urls.map(url => ({
                    url: url,
                    title: url, // Default title to URL
                    count: 0,
                    lastAccessed: null
                }))
            };
        });

        chrome.storage.local.set({ collections: migrated }, renderCollections);
    });
}

// Update your DOMContentLoaded handler
document.addEventListener("DOMContentLoaded", () => {
    migrateOldCollections(); // Add this line first
    renderCollections();
    renderOpenWindows();
    document.getElementById("createCollection").addEventListener("click", createCollection);
});

function createCollection() {
	
	 const createBtn = document.getElementById("createCollection");
    // Store original state
    const originalText = createBtn.textContent;
    const originalColor = createBtn.style.backgroundColor;

    // Change button state
    createBtn.textContent = "Refresh Page";
    createBtn.style.backgroundColor = "#ff4444";
	
	
    const collectionName = document.getElementById("collectionName").value.trim();
    const urlsText = document.getElementById("manualUrls").value.trim();

    if (!collectionName) {
        alert("Please enter a collection name.");
        return;
    }
	
	

    chrome.storage.local.get("collections", (data) => {
        const collections = data.collections || [];
        
        // Generate unique ID for the new collection
        const collectionId = `col-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        // Rest of your existing code...
        const selectedTabs = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
            .map(checkbox => ({
                url: checkbox.dataset.url,
                title: checkbox.closest('li').textContent.replace(checkbox.outerHTML, '').trim()
            }));

        const manualUrls = urlsText.split("\n")
            .map(url => url.trim())
            .filter(url => url)
            .map(url => ({
                url: url,
                title: url
            }));

        const allBookmarks = [...selectedTabs, ...manualUrls]
            .filter((v, i, a) => a.findIndex(t => t.url === v.url) === i)
            .map(b => ({
                ...b,
                id: `bm-${Date.now()}-${Math.random()}`, // Add bookmark ID
                count: 0,
                lastAccessed: null
            }));

        if (allBookmarks.length === 0) {
            alert("Please select at least one tab or enter a URL.");
            return;
        }

        collections.push({
            id: collectionId, // Add generated collection ID
            name: collectionName,
            bookmarks: allBookmarks
        });

        chrome.storage.local.set({ collections }, () => {
            renderCollections();
            document.getElementById("collectionName").value = "";
            document.getElementById("manualUrls").value = "";
            document.querySelectorAll("input[type='checkbox']").forEach(cb => cb.checked = false);
        });
    });
}

function toggleActionToolbar() {
    const toolbar = document.querySelector('.action-toolbar');
    toolbar.style.display = selectedTabs.size > 0 ? 'flex' : 'none';
}


function renderOpenWindows() {
    chrome.windows.getAll({ populate: true }, (windows) => {
        const windowsContainer = document.getElementById("windowsContainer");
        windowsContainer.innerHTML = "";

        // Add action toolbar
        const actionToolbar = document.createElement("div");
        actionToolbar.className = "action-toolbar";
        actionToolbar.innerHTML = `
            <button class="tab-action-btn edit-tabs">Edit Selected</button>
            <button class="tab-action-btn delete-tabs">Delete Selected</button>
            <button class="tab-action-btn move-tabs">Move Selected</button>
        `;
        windowsContainer.appendChild(actionToolbar);

        windows.forEach((win, winIndex) => {
            const windowDiv = document.createElement("div");
            windowDiv.className = "window-container";

            const windowTitle = document.createElement("h3");
            windowTitle.textContent = `Window ${winIndex + 1}`;
            windowDiv.appendChild(windowTitle);

            const tabList = document.createElement("ul");
            tabList.className = "tab-list";

            win.tabs.forEach((tab) => {
                const tabItem = document.createElement("li");
                tabItem.className = "tab-item";
                tabItem.innerHTML = `
                    <label>
                        <input type="checkbox" 
                               data-url="${tab.url}"
                               data-title="${tab.title}">
                        <a href="${tab.url}" class="tab-link" target="_blank">${tab.title}</a>
                    </label>
                `;

                // Handle checkbox changes
                const checkbox = tabItem.querySelector('input[type="checkbox"]');
                checkbox.addEventListener('change', (e) => {
                    const url = e.target.dataset.url;
                    if(e.target.checked) {
                        selectedTabs.add(url);
                    } else {
                        selectedTabs.delete(url);
                    }
                    toggleActionToolbar();
                });

                // Handle link clicks
                tabItem.querySelector('.tab-link').addEventListener('click', (e) => {
                    e.preventDefault();
                    chrome.tabs.create({ url: e.target.href });
                });

                tabList.appendChild(tabItem);
            });

            windowDiv.appendChild(tabList);
            windowsContainer.appendChild(windowDiv);
        });
    });
}

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('edit-tabs')) {
        handleEditSelected();
    }
    if(e.target.classList.contains('delete-tabs')) {
        handleDeleteSelected();
    }
    if(e.target.classList.contains('move-tabs')) {
        handleMoveSelected();
    }
});


function handleEditSelected() {
    selectedTabs.forEach(url => {
        const tabItem = document.querySelector(`input[data-url="${url}"]`).closest('.tab-item');
        const currentTitle = tabItem.querySelector('.tab-link').textContent;
        const newTitle = prompt('Edit title:', currentTitle);
        if(newTitle) {
            tabItem.querySelector('.tab-link').textContent = newTitle;
            // Update actual tab title if needed
            chrome.tabs.query({url: url}, (tabs) => {
                if(tabs[0]) {
                    chrome.tabs.executeScript(tabs[0].id, {
                        code: `document.title = "${newTitle}";`
                    });
                }
            });
        }
    });
    selectedTabs.clear();
    toggleActionToolbar();
}

function handleDeleteSelected() {
    if(confirm(`Delete ${selectedTabs.size} selected tabs?`)) {
        selectedTabs.forEach(url => {
            chrome.tabs.query({url: url}, (tabs) => {
                tabs.forEach(tab => chrome.tabs.remove(tab.id));
            });
            document.querySelector(`input[data-url="${url}"]`).closest('.tab-item').remove();
        });
        selectedTabs.clear();
        toggleActionToolbar();
    }
}

function handleMoveSelected() {
    chrome.storage.local.get("collections", (data) => {
        const collections = data.collections || [];
        const collectionNames = collections.map(c => c.name);
        const targetCollection = prompt(`Move to which collection?\n${collectionNames.join('\n')}`);
        
        if(targetCollection && collectionNames.includes(targetCollection)) {
            const targetIndex = collections.findIndex(c => c.name === targetCollection);
            selectedTabs.forEach(url => {
                const title = document.querySelector(`input[data-url="${url}"]`).dataset.title;
                collections[targetIndex].bookmarks.push({
                    url: url,
                    title: title,
                    count: 0,
                    lastAccessed: null
                });
            });
            chrome.storage.local.set({ collections }, () => {
                alert(`Moved ${selectedTabs.size} items to ${targetCollection}`);
                selectedTabs.clear();
                toggleActionToolbar();
            });
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    renderCollections();
    renderOpenWindows();
    document.getElementById("createCollection").addEventListener("click", createCollection);
});

  
function getValidUrl(url) {
    try {
        // First try to parse as-is
        new URL(url);
        return url;
    } catch {
        try {
            // Try adding https:// prefix
            const httpsUrl = `https://${url}`;
            new URL(httpsUrl);
            return httpsUrl;
        } catch {
            // Fallback to http:// if still invalid
            return `http://${url}`;
        }
    }
}

 
 


// Modified deleteBookmark function (for individual items)
function deleteBookmarkonly(collectionId, bookmarkId) {
    chrome.storage.local.get("collections", (data) => {
        const updatedCollections = data.collections.map(collection => {
            if (collection.id === collectionId) {
                // Filter out the specific bookmark
                return {
                    ...collection,
                    bookmarks: collection.bookmarks.filter(b => b.id !== bookmarkId)
                };
            }
            return collection;
        });

        chrome.storage.local.set({ collections: updatedCollections }, () => {
            // Refresh both views
            renderCollections(); // Update left sidebar count
            loadCollectionContent(collectionId); // Refresh current collection view
        });
    });
}

function loadCollectionContent(collectionId) {
    const windowsContainer = document.getElementById('windowsContainer');
    
    chrome.storage.local.get('collections', (data) => {
        const collection = data.collections.find(c => c.id === collectionId);
        if (!collection) return;

        windowsContainer.innerHTML = `
            <div class="collection-view">
                <h2>${collection.name}</h2>
                <div class="bookmarks-list">
                    ${collection.bookmarks.map(bookmark => `
                        <div class="bookmark-item">
                            <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
                            <button class="delete-bookmark" 
                                    data-collection-id="${collectionId}"
                                    data-bookmark-id="${bookmark.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
}
 
// Example action handler
function handleDeleteSelected() {
    const selected = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    
    selected.forEach(checkbox => {
        const collectionId = checkbox.dataset.collection;
        const bookmarkId = checkbox.dataset.bookmarkId;
        
        chrome.storage.local.get("collections", (data) => {
            const collections = data.collections.map(collection => {
                if (collection.id === collectionId) {
                    collection.bookmarks = collection.bookmarks.filter(b => b.id !== bookmarkId);
                }
                return collection;
            });
            
            chrome.storage.local.set({ collections }, () => {
                loadCollectionContent(collectionId); // Refresh view
            });
        });
    });
}

function saveCollection(collection) {
    if (!collection.id) collection.id = Date.now().toString();
    if (!collection.name) collection.name = 'Unnamed Collection';
    if (!Array.isArray(collection.bookmarks)) collection.bookmarks = [];
    
    chrome.storage.local.get({ collections: [] }, (data) => {
        const collections = data.collections.filter(c => c.id !== collection.id);
        collections.push(collection);
        chrome.storage.local.set({ collections });
    });
}


function showCollectionInSidebar(collectionId) {
    chrome.storage.local.get("collections", (data) => {
        const collection = data.collections.find(c => c.id === collectionId);
        const sidebar = document.getElementById("sidebar");
        
        sidebar.innerHTML = `
            <div class="sidebar-header">
                <h3>${collection.name} (${collection.bookmarks.length} items)</h3>
                <button class="close-sidebar">×</button>
            </div>
            <div class="sidebar-content">
                ${collection.bookmarks.map(bookmark => `
                    <div class="sidebar-item" data-url-id="${bookmark.id}">
                        <div class="url-info">
                            <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
                            <span class="access-count">${bookmark.count || 0} views</span>
                        </div>
                        <div class="url-controls">
                            <button class="edit-url">Edit</button>
                            <button class="delete-url">Delete</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Add close handler
        sidebar.querySelector('.close-sidebar').addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
        
        sidebar.classList.add('active');
    });
}


// Helper function for URL display
function getCleanHostname(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace(/^www\./, '');
    } catch {
        return 'Invalid URL';
    }
}

// Fixed renameCollection function
function renameCollection(index) {
    chrome.storage.local.get("collections", (data) => {
        const collections = data.collections || [];
        const newName = prompt("Enter new collection name:", collections[index].name);
        if (newName && newName.trim()) {
            collections[index].name = newName.trim();
            chrome.storage.local.set({ collections }, renderCollections);
        }
    });
}

// Fixed deleteCollection function
function deleteCollection(index) {
    chrome.storage.local.get("collections", (data) => {
        const collections = data.collections || [];
        if (confirm(`Delete collection "${collections[index].name}"?`)) {
            collections.splice(index, 1);
            chrome.storage.local.set({ collections }, renderCollections);
        }
    });
}

// Add event listener to the collections container using event delegation
document.getElementById('collectionsList').addEventListener('click', (e) => {
    // Check if delete button was clicked
    const deleteBtn = e.target.closest('.delete-collection');
    if (!deleteBtn) return;

    // Get collection ID from data attribute
    const collectionId = deleteBtn.dataset.id;
    
    // Confirm deletion
    if (confirm('Are you sure you want to delete this entire collection?')) {
        deleteCollectionmain(collectionId);
    }
});

// Delete collection function
function deleteCollectionmain(collectionId) {
    chrome.storage.local.get('collections', (data) => {
        // Filter out the deleted collection
        const updatedCollections = data.collections.filter(
            collection => collection.id !== collectionId
        );

        // Save updated collections
        chrome.storage.local.set({ collections: updatedCollections }, () => {
            // Re-render collections list
            renderCollections();
            
            // Clear right sidebar if viewing deleted collection
            const currentCollection = document.querySelector('#windowsContainer h3');
            if (currentCollection && currentCollection.textContent === collectionId) {
                document.getElementById('windowsContainer').innerHTML = '';
            }
        });
    });
}



// Context menu function
function showBookmarkContextMenu(e, collectionIndex, bookmarkIndex) {
    const menu = document.createElement("div");
    menu.className = "context-menu";
    menu.innerHTML = `
        <div class="menu-item" data-action="open">Open Link</div>
        <div class="menu-item" data-action="edit">Edit</div>
        <div class="menu-item" data-action="copy">Copy URL</div>
        <div class="menu-item" data-action="delete">Delete</div>
    `;

    menu.style.position = "absolute";
    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;
    
    document.body.appendChild(menu);

    menu.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.stopPropagation();
            handleContextMenuAction(e.target.dataset.action, collectionIndex, bookmarkIndex);
            menu.remove();
        });
    });

    // Close menu when clicking elsewhere
    const closeMenu = () => {
        menu.remove();
        document.removeEventListener("click", closeMenu);
    };
    document.addEventListener("click", closeMenu);
}

function handleContextMenuAction(action, collectionIndex, bookmarkIndex) {
    chrome.storage.local.get("collections", (data) => {
        const collections = data.collections || [];
        const bookmark = collections[collectionIndex].bookmarks[bookmarkIndex];

        switch(action) {
            case 'open':
                openBookmark(bookmark.url);
                updateAccessCount(collectionIndex, bookmarkIndex);
                break;
                
            case 'edit':
                const newTitle = prompt("Edit title:", bookmark.title);
                const newUrl = prompt("Edit URL:", bookmark.url);
                if(newTitle && newUrl) {
                    bookmark.title = newTitle.trim();
                    bookmark.url = newUrl.trim();
                    chrome.storage.local.set({ collections }, renderCollections);
                }
                break;
                
            case 'copy':
                navigator.clipboard.writeText(bookmark.url);
                break;
                
            case 'delete':
                if(confirm(`Delete "${bookmark.title}"?`)) {
                    collections[collectionIndex].bookmarks.splice(bookmarkIndex, 1);
                    chrome.storage.local.set({ collections }, renderCollections);
                }
                break;
        }
    });
}

// New bookmark management functions
function openBookmark(url) {
    chrome.tabs.create({ url });
}

function updateAccessCount(collectionIndex, bookmarkIndex) {
    chrome.storage.local.get("collections", (data) => {
        const collections = data.collections || [];
        const bookmark = collections[collectionIndex].bookmarks[bookmarkIndex];
        bookmark.count = (bookmark.count || 0) + 1;
        bookmark.lastAccessed = new Date().toISOString();
        chrome.storage.local.set({ collections }, renderCollections);
    });
}

function editBookmark(collectionIndex, bookmarkIndex) {
    chrome.storage.local.get("collections", (data) => {
        const collections = data.collections || [];
        const bookmark = collections[collectionIndex].bookmarks[bookmarkIndex];
        
        const newTitle = prompt("Edit bookmark title:", bookmark.title);
        const newUrl = prompt("Edit bookmark URL:", bookmark.url);
        
        if(newTitle && newUrl) {
            bookmark.title = newTitle.trim();
            bookmark.url = newUrl.trim();
            chrome.storage.local.set({ collections }, renderCollections);
        }
    });
}

function deleteBookmark(collectionIndex, bookmarkIndex) {
    if(confirm("Delete this bookmark?")) {
        chrome.storage.local.get("collections", (data) => {
            const collections = data.collections || [];
            collections[collectionIndex].bookmarks.splice(bookmarkIndex, 1);
            chrome.storage.local.set({ collections }, renderCollections);
        });
    }
}



function showMoveDialog(collectionIndex, bookmarkIndex) {
    chrome.storage.local.get("collections", (data) => {
        const collections = data.collections || [];
        const bookmark = collections[collectionIndex].bookmarks[bookmarkIndex];
        
        const targetCollection = prompt(`Move to which collection?\n${collections.map(c => c.name).join("\n")}`);
        const targetIndex = collections.findIndex(c => c.name === targetCollection);
        
        if(targetIndex > -1 && targetIndex !== collectionIndex) {
            collections[targetIndex].bookmarks.push(bookmark);
            collections[collectionIndex].bookmarks.splice(bookmarkIndex, 1);
            chrome.storage.local.set({ collections }, renderCollections);
        }
    });
}

function showAddBookmarkDialog(collectionIndex) {
    const url = prompt("Enter bookmark URL:");
    const title = prompt("Enter bookmark title:");
    
    if(url && title) {
        chrome.storage.local.get("collections", (data) => {
            const collections = data.collections || [];
            collections[collectionIndex].bookmarks.push({
                url: url.trim(),
                title: title.trim(),
                count: 0,
                lastAccessed: null
            });
            chrome.storage.local.set({ collections }, renderCollections);
        });
    }
}


function addToCollection(collectionId, tab) {
  chrome.storage.local.get(['collections'], ({ collections }) => {
    const updated = collections.map(collection => {
      if (collection.id === collectionId) {
        return {
          ...collection,
          bookmarks: [
            ...collection.bookmarks,
            {
              id: `bm-${Date.now()}`,
              url: tab.url,
              title: tab.title,
              dateAdded: Date.now()
            }
          ]
        };
      }
      return collection;
    });

    chrome.storage.local.set({ collections: updated });
  });
}

// Load collections (completely tab-independent)
function loadCollections() {
  chrome.storage.local.get(['collections'], ({ collections }) => {
    renderCollections(collections);
    // No tab query needed
  });
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['collections'], (result) => {
    // Ensure collections is always an array
    const collections = Array.isArray(result.collections) ? result.collections : [];
    
    // Initialize storage if empty
    if (collections.length === 0) {
      chrome.storage.local.set({ collections: [] });
    }
    
    renderCollections(collections);
  });
});

 

// Delete collection function (unchanged)
function deleteCollection(collectionId) {
  chrome.storage.local.get('collections', (data) => {
    const updated = data.collections.filter(c => c.id !== collectionId);
    chrome.storage.local.set({ collections: updated }, () => {
      renderCollections(updated);
      const currentCollection = document.querySelector('#windowsContainer h3');
      if (currentCollection?.dataset.id === collectionId) {
        document.getElementById('windowsContainer').innerHTML = '';
      }
    });
  });
}

// Delete handler (removes from storage only)
function handleDeleteBookmark(collectionId, bookmarkId) {
  chrome.storage.local.get(['collections'], ({ collections }) => {
    const updated = collections.map(collection => {
      if (collection.id === collectionId) {
        return {
          ...collection,
          bookmarks: collection.bookmarks.filter(b => b.id !== bookmarkId)
        };
      }
      return collection;
    });
    
    chrome.storage.local.set({ collections: updated });
  });
}


// Modified collection creation function
function createNewCollection() {
    const collectionName = document.getElementById('newCollectionName').value;
    
    if (!collectionName) {
        alert('Please enter a collection name');
        return;
    }

    const newCollection = {
        id: `col-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Generate unique ID
        name: collectionName,
        bookmarks: []
    };

    chrome.storage.local.get(['collections'], (result) => {
        const collections = Array.isArray(result.collections) ? result.collections : [];
        const updated = [...collections, newCollection];
        
        chrome.storage.local.set({ collections: updated }, () => {
            document.getElementById('newCollectionName').value = '';
            renderCollections(updated);

        });
		
		
		
    });
	

	
}

// Add this to your renderCollections function
function renderCollections(collections = []) {
    const container = document.getElementById('collectionsList');
    
    container.innerHTML = collections.map(collection => `
        <div class="collection" data-id="${collection.id}">
            <div class="collection-header clickable">
                <h3>${collection.name}</h3>
                <div class="collection-count">
                    ${collection.bookmarks?.length || 0} items
                </div>
            </div>
            <button class="delete-collection" data-id="${collection.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    // Add click handler for collection items
    container.addEventListener('click', (e) => {
        const collectionElement = e.target.closest('.collection');
        const collectionId = collectionElement?.dataset.id;
        
        if (collectionId && e.target.closest('.clickable')) {
            loadCollectionContent(collectionId);
        }
    });

    // Existing delete button handler...
}

// Add event delegation for bookmark delete buttons
document.getElementById('windowsContainer').addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-bookmark');
    if (!deleteBtn) return;

    const collectionId = deleteBtn.dataset.collectionId;
    const bookmarkId = deleteBtn.dataset.bookmarkId;
    
    if (confirm('Are you sure you want to delete this bookmark?')) {
        deleteBookmarklinkonly(collectionId, bookmarkId);
    }
});

// Bookmark deletion function
function deleteBookmarklinkonly(collectionId, bookmarkId) {
    chrome.storage.local.get('collections', (data) => {
        const updatedCollections = data.collections.map(collection => {
            if (collection.id === collectionId) {
                return {
                    ...collection,
                    bookmarks: collection.bookmarks.filter(b => b.id !== bookmarkId)
                };
            }
            return collection;
        });

        chrome.storage.local.set({ collections: updatedCollections }, () => {
            // Refresh both views
            renderCollections(updatedCollections);
            loadCollectionContent(collectionId); // Reload the current collection
        });
    });
}



 function sendButtonClickData(buttonId) {
   fetch("https://scrsht.com/track-button-click.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      buttonId: buttonId,
      timestamp: new Date().toISOString(),
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Button click tracked successfully:", data);
   //   alert("Button click tracked successfully:", data);
	  
    })
    .catch((error) => {
      console.error("Error sending button click data:", error);
	//        alert("Error sending button click data:", error);

    });
}


document.addEventListener("DOMContentLoaded", () => {
    var buttonId = 'openDashboard';
    sendButtonClickData(buttonId);
});
	
