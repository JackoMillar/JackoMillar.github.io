function refreshAndShowAll() {
    // Set the active class on the "Show all" button before refresh
    var showAllBtn = document.getElementById("showAllBtn");
    showAllBtn.classList.add("active");

    // Store the active state in local storage
    localStorage.setItem("activeButton", "showAll");

    // Refresh the page
    location.reload();
}

document.addEventListener("DOMContentLoaded", function() {
    filterSelection("all");

    // Check if "Show all" button should be active after page reload
    if (localStorage.getItem("activeButton") === "showAll") {
        document.getElementById("showAllBtn").classList.add("active");
        localStorage.removeItem("activeButton"); // Clear the stored value
    }

    var btnContainer = document.getElementById("myTagContainer");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            // Remove "active" class from all buttons
            var current = document.getElementsByClassName("btn active");
            while (current.length > 0) {
                current[0].classList.remove("active");
            }

            // Add "active" class to the clicked button
            this.classList.add("active");

            // Call filterSelection with the button's text content
            filterSelection(this.textContent.toLowerCase());
        });
    }
});


        function toggleContent(button) {
            var textContent = button.parentElement;
            textContent.classList.toggle("expanded");
            if (textContent.classList.contains("expanded")) {
                button.textContent = "Read less";
            } else {
                button.textContent = "Read more";
            }
        }

        function filterSelection(c) {
            var x, i, projects, tags, tagElements, j, t;
            projects = document.getElementsByClassName("project-section");
            if (c == "all") { t = true; } else { t = false; }
            for (i = 0; i < projects.length; i++) {
                w3RemoveClass(projects[i], "show");
                tags = projects[i].getElementsByClassName("tag");
                for (j = 0; j < tags.length; j++) {
                    if (t == false) {
                        var regex = new RegExp("\\b" + c + "\\b", "i");
                        if (regex.test(tags[j].className)) {
                            w3AddClass(projects[i], "show");
                            break;
                        }
                    } else {
                        w3AddClass(projects[i], "show");
                        break;
                    }
                }
            }
        }
        
        function w3AddClass(element, name) {
            var i, arr1, arr2;
            arr1 = element.className.split(" ");
            arr2 = name.split(" ");
            for (i = 0; i < arr2.length; i++) {
                if (arr1.indexOf(arr2[i]) == -1) {
                    element.className += " " + arr2[i];
                }
            }
        }
        
        function w3RemoveClass(element, name) {
            var i, arr1, arr2;
            arr1 = element.className.split(" ");
            arr2 = name.split(" ");
            for (i = 0; i < arr2.length; i++) {
                while (arr1.indexOf(arr2[i]) > -1) {
                    arr1.splice(arr1.indexOf(arr2[i]), 1);
                }
            }
            element.className = arr1.join(" ");
        }
        