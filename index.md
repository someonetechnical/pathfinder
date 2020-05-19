<html>
  <head>
    <link rel="stylesheet" type="text/css" href="./css/styles.css" />
    <link rel="stylesheet" type="text/css" href="./css/menu.css" />
    <link rel="stylesheet" type="text/css" href="./css/board.css" />
    <link rel="stylesheet" type="text/css" href="./css/slider.css" />
    <link rel="stylesheet" type="text/css" href="./css/button.css" />
    <link rel="stylesheet" type="text/css" href="./css/menutoggle.css" />
    <title>Pathfinder</title>
  </head>
  <body>
    <div class="container-menu">
      <div>
        <h3 id="algorithm-title">Choose a algorithm</h3>
      </div>
      <div class="container-algorithm">
        <button class="menu-btn toggle-btn" id="algorithm">Algorithms</button>
        <div
          id="container-algorithm-items"
          class="container-menu-toggle togglemenu-hidden"
        >
          <ul id="algorithm-list" class="menu-list">
            <li class="menu-item" data-value="bfs">Breath First Search</li>
            <li class="menu-item" data-value="dfs">Depth First Search</li>
          </ul>
        </div>
      </div>
      <div class="container-speed">
        <input
          id="speed"
          type="range"
          min="0"
          max="500"
          value="25"
          class="slider"
        />
        <span id="speed-value"></span>
      </div>
      <div class="container-maze">
        <button class="menu-btn" id="maze">Generate Maze</button>
      </div>
      <div class="container-start">
        <button class="menu-btn menu-btn-start" id="start">Start</button>
      </div>
    </div>
    <div id="boardContainer" class="boardContainer"></div>
  </body>

  <script type="text/javascript" src="./src/js/draw/slider.js"></script>
  <script type="text/javascript" src="./src/js/draw/toggleButton.js"></script>
  <script type="text/javascript" src="./src/js/draw/algorithmSelector.js"></script>
  <script type="text/javascript" src="./src/js/draw/drawWalls.js"></script>
  <script type="text/javascript" src="./src/js/logic/items/cell.js"></script>
  <script type="text/javascript" src="./src/js/logic/items/board.js"></script>
  <script type="text/javascript" src="./src/js/logic/items/node.js"></script>
  <script type="text/javascript" src="./src/js/logic/items/tree.js"></script>
  <script type="text/javascript" src="./src/js/draw/drawBoards.js"></script>
  <script type="text/javascript" src="./src/js/draw/algorithmTitle.js"></script>
  <script type="text/javascript" src="./src/js/logic/maze.js"></script>
  <script type="text/javascript" src="./src/js/logic/alorithms/depthFirstSearch.js"></script>
  <script type="text/javascript" src="./src/js/logic/alorithms/breathFirstSearch.js"></script>
  <script type="text/javascript" src="./src/js/logic/alorithms/algoFactory.js"></script>
  <script type="text/javascript" src="./src/js/start.js"></script>
</html>
