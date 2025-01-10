## React State Manager


## File Structure
-  stateManager: This file contains the central state manager, where all the useState hooks are declared and managed.


## Purpose

- This file serves as a central manager for
-  handling state using useState in a React application.
-  The primary goal is to avoid prop drilling by consolidating state management in a single location.
-  This approach is often referred to as a "store" or "context API".
-  It's a good practice to keep state management separate from components.


-  In larger React applications, passing state through multiple layers
-  of components (prop drilling) can lead to code complexity and reduced
-  maintainability. This file aims to address this issue by centralizing
-  the management of state using the useState hook.


