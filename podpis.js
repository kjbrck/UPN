var canvas = document.getElementById("podpis");
			var context = canvas.getContext("2d");
			
			canvas.width = 188;
			canvas.height = 105;

			var points = [];
			var last = 0;
			var color = "#000000";
			var size = 2;

			canvas.onmousemove = function(e) {
			  if (e.buttons == 1) {
				var offsets = canvas.getBoundingClientRect();
				var zgoraj = offsets.top;
				var levo = offsets.left;
				addClick(e.pageX - levo, e.pageY - zgoraj, true);
				redraw();
			  }
			}

			canvas.onmousedown = function(e) {
				var offsets = canvas.getBoundingClientRect();
				var zgoraj = offsets.top;
				var levo = offsets.left;
			  addClick(e.pageX - levo, e.pageY - zgoraj, false);
			  redraw();
			}

			function addClick(x, y, dragging) {
			  points.push({x: x, y: y, dragging: dragging });
			}

			context.lineJoin = "round";

			function redraw() {
			  context.strokeStyle = color;
			  context.lineWidth = size;
			  for (var i = last; i < points.length; i++) {
				context.beginPath();
				if (points[i].dragging && i)
				  context.moveTo(points[i - 1].x, points[i - 1].y);
				else
				  context.moveTo(points[i].x, points[i].y);
				context.lineTo(points[i].x, points[i].y);
				
				context.closePath();
				context.stroke();
			  }
			  
			  last = points.length;
			}