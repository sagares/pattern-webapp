//Generated by CoffeeScript 1.4.0
(function() {
	var colorCache, getRgb, hexToRgb, hslToRgb, hsvToRgb, hue2rgb, lighten, linearNormalize, mapColor, mappyDefinition, normalizeFilter, rgbToHex, rgbToHsl, rgbToHsv, template, toColorFilter, valueToColorHex, valueToColorRgb;
	hue2rgb = function(p, q, t) {
		if (t < 0) {
			t += 1;
		}
		if (t > 1) {
			t -= 1;
		}
		if (t < 1 / 6) {
			return p + (q - p) * 6 * t;
		}
		if (t < 1 / 2) {
			return q;
		}
		if (t < 2 / 3) {
			return p + (q - p) * (2 / 3 - t) * 6;
		}
		return p;
	};
	rgbToHsl = function(r, g, b) {
		var d, h, l, max, min, s;
		r /= 255;
		g /= 255;
		b /= 255;
		max = Math.max(r, g, b);
		min = Math.min(r, g, b);
		l = (max + min) / 2;
		if (max === min) {
			h = s = 0;
		} else {
			d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
			}
			h /= 6;
		}
		return [h, s, l];
	};
	hslToRgb = function(h, s, l) {
		var b, g, p, q, r;
		if (s === 0) {
			r = g = b = l;
		} else {
			q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			p = 2 * l - q;
			r = hue2rgb(p, q, h + 1 / 3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1 / 3);
		}
		return [r * 255, g * 255, b * 255];
	};
	rgbToHsv = function(r, g, b) {
		var d, h, max, min, s, v;
		r = r / 255;
		g = g / 255;
		b = b / 255;
		max = Math.max(r, g, b);
		min = Math.min(r, g, b);
		v = max;
		d = max - min;
		s = max === 0 ? 0 : d / max;
		if (max === min) {
			h = 0;
		} else {
			switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
			}
			h /= 6;
		}
		return [h, s, v];
	};
	hsvToRgb = function(h, s, v) {
		var b, f, g, i, p, q, r, t;
		i = Math.floor(h * 6);
		f = h * 6 - i;
		p = v * (1 - s);
		q = v * (1 - f * s);
		t = v * (1 - (1 - f) * s);
		switch (i % 6) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;
		case 1:
			r = q;
			g = v;
			b = p;
			break;
		case 2:
			r = p;
			g = v;
			b = t;
			break;
		case 3:
			r = p;
			g = q;
			b = v;
			break;
		case 4:
			r = t;
			g = p;
			b = v;
			break;
		case 5:
			r = v;
			g = p;
			b = q;
		}
		return [r * 255, g * 255, b * 255];
	};
	rgbToHex = function(r, g, b) {
		return "#" + ((1 << 24) + (parseInt(r, 10) << 16) + (parseInt(g, 10) << 8) + parseInt(b, 10)).toString(16).slice(1);
	};
	hexToRgb = function(hex) {
		var result;
		result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (result) {
			return {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			};
		} else {
			return null;
		}
	};
	colorCache = {};
	getRgb = function(hex) {
		if (!colorCache[hex]) {
			colorCache[hex] = hexToRgb(hex);
		}
		return colorCache[hex];
	};
	valueToColorRgb = function(val, scale) {
		var c1, c2, distanceIntoSegment, epsilon, numSegments, range, segmentSize, thisSegment, thisSegmentStart;
		epsilon = 0.00001;
		if (val === 0 || val < epsilon) {
			return scale[0];
		}
		if (val === 1) {
			return scale[scale.length - 1];
		}
		numSegments = scale.length - 1;
		segmentSize = 1 / numSegments;
		thisSegment = parseInt(val / segmentSize, 10);
		thisSegmentStart = thisSegment * segmentSize;
		distanceIntoSegment = (val - thisSegmentStart) / segmentSize;
		c1 = scale[thisSegment];
		c2 = scale[thisSegment + 1];
		range = {
				r: c2.r - c1.r,
				g: c2.g - c1.g,
				b: c2.b - c1.b
		};
		return {
			r: c1.r + range.r * distanceIntoSegment,
			g: c1.g + range.g * distanceIntoSegment,
			b: c1.b + range.b * distanceIntoSegment
		};
	};
	valueToColorHex = function(val, scale) {
		var c, color, hexScale;
		hexScale = (function() {
			var _i, _len, _results;
			_results = [];
			for (_i = 0, _len = scale.length; _i < _len; _i++) {
				color = scale[_i];
				_results.push(getRgb(color));
			}
			return _results;
		})();
		c = valueToColorRgb(val, hexScale);
		return rgbToHex(c.r, c.g, c.b);
	};
	template = "<svg fill=\"#ff0000\" ng-mousedown=\"click($event)\" ng-attr-width=\"{{elementWidth}}\" ng-attr-height=\"{{(elementWidth / mapData.width) * mapData.height}}\" >\n <g transform=\"scale({{ (elementWidth / mapData.width) * zoom }}) translate({{translate.x}} {{translate.y}})\" >\n <path ng-repeat=\"(cc, path) in mapData.paths\" ng-attr-d=\"{{path.path}}\"\n fill=\"{{ hover.cc==cc && !hover.out ? processedData[cc].hoverColor : processedData[cc].color }}\"\n ng-mouseover=\"mouseover($event, path, cc)\"\n ng-mousemove=\"mousemove($event, path, cc)\"\n ng-mouseout=\"mouseout($event, path, cc)\"\n ng-mousedown=\"mousedown($event, path, cc)\">\n </path>\n </g>\n</svg>\n<div class=\"data-tooltip\" ng-show=\"hover && (hover.out == false)\"\n ng-mouseover=\"hover.out = false\" ng-mouseout=\"hover.out=true\" >\n<div class=\"data-tooltip-header\">{{hover.name}}</div>\n<div class=\"data-tooltip-value\">{{ hover.value }}</div>\n</div>";
	linearNormalize = function(val, min, max) {
		var normalized, range;
		range = max - min;
		if (range === 0 || val === void 0) {
			return null;
		}
		normalized = (val - min) / range;
		return normalized;
	};
	mapColor = function(normalized, colors) {
		if (normalized === void 0 || normalized === null || isNaN(normalized)) {
			return null;
		}
		normalized = Math.min(1.0, Math.max(0, normalized));
		try {
			return valueToColorHex(normalized, colors);
		} catch (e) {
			return console.log("ERROR", normalized);
		}
	};
	lighten = function(color, factor) {
		var c, h, r;
		c = hexToRgb(color);
		h = rgbToHsl(c.r, c.g, c.b);
		h[2] *= factor;
		r = hslToRgb(h[0], h[1], h[2]);
		return rgbToHex(r[0], r[1], r[2]);
	};
	normalizeFilter = function($scope) {
		return function(input) {};
	};
	toColorFilter = function($scope) {
		return function(input) {
			var normalized;
			normalized = $scope.normalizeFn(input);
			return mapColor(normalized, $scope.colors);
		};
	};
	mappyDefinition = function($window, $timeout) {
		return {
			restrict: "EA",
			template: template,
			scope: {
				data: "=?",
				key: "@",
				subCategory: "@",
				colors: "=?",
				min: "@",
				max: "@",
				nullDataColor: "@",
				normalizeFn: "&",
				humanizeFn: "&",
				clickFn: "&",
				refreshWatch: "@",
				mapData: "=?"
			},
			compile: function() {
				var $w, self;
				self = this;
				$w = angular.element($window);
				return {
					pre: function(scope, element, attrs) {
						if (!(attrs.mapData != null)) {
							throw Exception("No map data specified (map-data attribute)");
						}
						return scope.hover = {};
					},
					post: function(scope, element, attrs) {
						var calcMinMax, calculateScale, getData, getValue, id, margin, normalizeFn, resize, setTranslateInBounds, svg, tooltip, updateColors, valueToTooltip;
						margin = {
								top: 10,
								left: 0
						};
						tooltip = element.find('.data-tooltip');
						svg = element.find("svg");
						if (!scope.colors) {
							scope.colors = ["#FFFF00", "#FF0000"];
						}
						if (!scope.nullDataColor) {
							scope.nullDataColor = "#dddddd";
							attrs.$set('null-data-color', scope.nullDataColor);
						}
						normalizeFn = function(args) {
							if (attrs.normalizeFn) {
								return scope.normalizeFn(args);
							} else {
								return linearNormalize(args.val, args.min, args.max);
							}
						};
						scope.zoom = 1;
						scope.translate = {
								x: margin.left,
								y: margin.top
						};
						scope.processedData = {};
						getData = function() {
							if (!scope.data) {
								return null;
							}
							if (scope.subCategory) {
								return scope.data[scope.subCategory];
							} else {
								return scope.data;
							}
						};
						getValue = function(cc) {
							var data, dp;
							data = getData();
							if (!data) {
								return void 0;
							}
							dp = data[cc];
							if (dp === void 0) {
								return void 0;
							}
							if (scope.key) {
								return dp[scope.key];
							} else {
								return dp;
							}
						};
						valueToTooltip = function(cc) {
							var v;
							if (!scope.data) {
								return "No dataset selected";
							}
							v = getValue(cc);
							if (v === void 0) {
								return "No data";
							} else if (attrs.humanizeFn) {
								return scope.humanizeFn({
									val: v
								});
							} else {
								return v;
							}
						};
						calcMinMax = function() {
							var cc, data, dp, max, min, v;
							data = getData();
							min = Infinity;
							max = -Infinity;
							for (cc in data) {
								dp = data[cc];
								v = getValue(cc);
								min = Math.min(min, v);
								max = Math.max(max, v);
							}
							scope.min = min;
							return scope.max = max;
						};
						updateColors = function() {
							var cc, col, country, data, dp, normalized, path, v, _ref, _results;
							if (!attrs.min || !attrs.max) {
								calcMinMax();
							}
							scope.processedData = [];
							data = getData();
							_ref = scope.mapData.paths;
							for (cc in _ref) {
								path = _ref[cc];
								country = {};
								scope.processedData[cc] = country;
								col = scope.nullDataColor || "#dddddd";
								country.color = col;
								country.hoverColor = lighten(col, 0.8);
								country.tooltip = valueToTooltip(cc);
							}
							if (data) {
								if (scope.min === void 0 || scope.max === void 0) {
									calcMinMax();
								}
								_results = [];
								for (cc in data) {
									dp = data[cc];
									v = getValue(cc);
									if (scope.mapData.paths[cc]) {
										normalized = normalizeFn({
											val: v,
											min: scope.min,
											max: scope.max
										});
										col = mapColor(normalized, scope.colors) || scope.nullDataColor;
										scope.processedData[cc].color = col;
										_results.push(scope.processedData[cc].hoverColor = lighten(col, 0.8));
									} else {
										_results.push(void 0);
									}
								}
								return _results;
							}
						};
						scope.$watchCollection(['subCategory', 'refreshWatch'], function() {
							return updateColors();
						});
						scope.$watch('data', updateColors);
						scope.$watch("key", updateColors);
						setTranslateInBounds = function(x, y) {
							var mapHeight, maxTranslateX, maxTranslateY, scale;
							scale = scope.elementWidth / scope.mapData.width;
							scope.translate.x = Math.min(0 + margin.left, x);
							scope.translate.y = Math.min(0 + margin.top, y);
							mapHeight = (scope.elementWidth / scope.mapData.width) * scope.mapData.height;
							maxTranslateY = (mapHeight / (scale * scope.zoom)) - scope.mapData.height;
							maxTranslateX = (scope.elementWidth / (scale * scope.zoom)) - scope.mapData.width;
							scope.translate.x = Math.max(maxTranslateX + margin.left, scope.translate.x);
							return scope.translate.y = Math.max(maxTranslateY + margin.top, scope.translate.y);
						};
						calculateScale = function() {
							return (scope.elementWidth / scope.mapData.width) * scope.zoom;
						};
						if (!(attrs.noScrollZoom != null)) {
							svg.on("mousewheel", function(e, delta) {
								var newZoom, oldZoom, pX, pY, scale, transX, transY, up;
								up = e.originalEvent.wheelDelta > 0 ? true : false;
								newZoom = Math.max(1.0, scope.zoom * (up ? 1.2 : 0.8));
								newZoom = Math.min(10, newZoom);
								oldZoom = scope.zoom;
								scale = scope.elementWidth / scope.mapData.width;
								pX = (e.offsetX / (scale * oldZoom)) - scope.translate.x;
								pY = (e.offsetY / (scale * oldZoom)) - scope.translate.y;
								scope.zoom = newZoom;
								transX = (e.offsetX / (scale * newZoom)) - pX;
								transY = (e.offsetY / (scale * newZoom)) - pY;
								setTranslateInBounds(transX, transY);
								scope.$apply();
								return e.preventDefault();
							});
							scope.click = function(event) {
								var scale, startX, startY;
								$w.on('selectstart.angular-mappy', function() {
									return false;
								});
								startX = scope.translate.x;
								startY = scope.translate.y;
								scale = calculateScale();
								$w.on('mousemove.mappy', function(e) {
									var newX, newY;
									newX = startX + (e.pageX - event.pageX) / scale;
									newY = startY + (e.pageY - event.pageY) / scale;
									setTranslateInBounds(newX, newY);
									return scope.$apply();
								});
								return $w.on('mouseup.mappy', function(e) {
									$w.unbind('mousemove.mappy');
									$w.unbind('mouseup.mappy');
									return $w.unbind('selectstart.angular-mappy');
								});
							};
						}
						scope.mouseover = function(event, path, cc) {
							scope.hover.value = scope.processedData[cc].tooltip;
							scope.hover.out = false;
							scope.hover.x = event.offsetX;
							scope.hover.y = event.offsetY;
							scope.hover.name = path.name;
							return scope.hover.cc = cc;
						};
						scope.mouseout = function(event, path, cc) {
							return scope.hover.out = true;
						};
						scope.mousedown = function(event, path, cc) {
							scope.hover.out = true;
							return scope.clickFn({
								event: event,
								cc: cc
							});
						};
						scope.mousemove = function(event) {
							scope.hover.x = event.clientX;
							scope.hover.y = event.clientY;
							return tooltip.css({
								left: scope.hover.x,
								top: scope.hover.y + 40
							});
						};
						resize = function() {
							return scope.elementWidth = element.width();
						};
						$w.on("resize", function() {
							if (element.css('display') !== 'none') {
								resize();
								return scope.$apply();
							}
						});
						id = element.attr('id');
						if (id) {
							scope.$on("redrawmappy." + id, function() {
								return $timeout(resize, 20);
							});
						}
						return resize();
					}
				};
			}
		};
	};
	angular.module('mappy', []).directive('mappy', mappyDefinition).filter('mapToColor', toColorFilter);
}).call(this);