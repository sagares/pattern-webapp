var app = angular.module('Dashboard',['angularCharts','easypiechart','ngAnimate','mappy']);

app.controller('SidebarCtrl', ['$scope', SidebarCtrl]);
function SidebarCtrl($scope) {
	var mobileView = 992;

	$scope.getWidth = function() { return window.innerWidth; };

	$scope.$watch($scope.getWidth, function(newValue, oldValue)
			{
		if(newValue >= mobileView)
		{

			$scope.toggle = true;
		}
		else
		{
			$scope.toggle = false;
		}

			});

	$scope.toggleSidebar = function() 
	{
		$scope.toggle = ! $scope.toggle;

	};

	window.onresize = function() { $scope.$apply(); };
}

app.controller('BarChartCtrl', ['$scope', BarChartCtrl]);
function BarChartCtrl($scope){
	$scope.barChart = 'bar';
	
	$scope.data2 = {
			series: ["Sales", "Income", "Expense"],
			data: [{
				x : "Jack",
				y: [500,410, 384]
			},
			{
				x : "John",
				y: [200, 289, 256]
			},
			{
				x : "Stacy",
				y: [300, 270, 255]
			},
			{
				x : "Luke",
				y: [854, 541, 379]
			},{
				x : "Peter",
				y : [500,200,175]
			}] 
	};
	
	$scope.config2= {
			title : "Bar Chart",
			tooltips :  true,
			mouseover: function() {},
			mouseout: function() {},
			click: function() {},
			legend: {
				display: true,
				//could be 'left, right'
				position: 'left'
			},
			/*colors :['#5bc0de','#d9534f','#f0ad4e','#5cb85c','#428bca','#333333'],*/
			colors : ['#4a89dc','#f6bb42','#37bc9b','#da4453',"steelBlue", "rgb(255,153,0)", "rgb(220,57,18)", "rgb(70,132,238)", "rgb(73,66,204)", 
			          "rgb(0,128,0)",'#4a89dc','#f6bb42','#37bc9b','#da4453'],
			          innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
			          lineLegend: 'lineEnd' // can be also 'traditional'
	};
	
}

app.controller('PieChartCtrl', ['$scope', PieChartCtrl]);
function PieChartCtrl($scope){
	$scope.pieChart = 'pie';
	
	$scope.data1 = {
			series: ["Sales", "Income", "Expense"],
			data: [{
				x : "Jack",
				y: [100,210, 384],
				tooltip:"Jack"
			},
			{
				x : "John",
				y: [200, 289, 456],
				tooltip : "John"
			},
			{
				x : "Stacy",
				y: [300, 170, 255],
				tooltip : "Stacy"
			},
			{
				x : "Luke",
				y: [154, 341, 879],
				tooltip : "Luke"
			},{
				x : "Peter",
				y : [76,200,500],
				tooltip:"Peter"
			}] 
	};
	
	$scope.config1= {
			title : "Pie Chart",
			tooltips :  true,
			mouseover: function() {},
			mouseout: function() {},
			click: function() {},
			legend: {
				display: true,
				//could be 'left, right'
				position: 'left'
			},
			/*colors :['#5bc0de','#d9534f','#f0ad4e','#5cb85c','#428bca','#333333'],*/
			colors : ["steelBlue", "rgb(255,153,0)", "rgb(220,57,18)", "rgb(70,132,238)", "rgb(73,66,204)", 
			          "rgb(0,128,0)",'#4a89dc','#f6bb42','#37bc9b','#da4453'],
			          innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
			          lineLegend: 'lineEnd' // can be also 'traditional'
	};
}

app.controller("EasyPieChartCtrl",['$scope', EasyPieChartCtrl]);
function EasyPieChartCtrl($scope){
	$scope.percent1 = 65;
	$scope.options1 = {
			animate:{
				duration:1000,
				enabled:true
			},
			barColor:'#da4453',
			scaleColor:'#AFB0B0',
			trackColor : '#f4f4f4',
			lineCap : 'butt', /*butt, round, square*/
			lineWidth:10,
			size : 120,
			lineCap:'circle'
	};

	$scope.percent2 = 45;
	$scope.options2 = {
			animate:{
				duration:1000,
				enabled:true
			},
			barColor:'#37bc9b',
			scaleColor:'#AFB0B0',
			trackColor : '#f4f4f4',
			lineCap : 'butt', /*butt, round, square*/
			lineWidth:10,
			size : 120,
			lineCap:'circle'
	};
	$scope.registrations = 342;

	$scope.percent3 = 85;
	$scope.options3 = {
			animate:{
				duration:1000,
				enabled:true
			},
			barColor:'#4a89dc',
			scaleColor:'#AFB0B0',
			trackColor : '#f4f4f4',
			lineCap : 'butt', /*butt, round, square*/
			lineWidth:10,
			size : 120,
			lineCap:'circle',
			easing:"easeOutBounce"
	};
}

app.controller("CustomerListCtrl",['$scope',CustomerListCtrl]);
function CustomerListCtrl($scope){
	$scope.customers = ['John Smith','Peter Parker','Bruce Weyn','Tony Stark','Jack Reacher',
	                    'Abrahm','Luke','Stacy','Roopteja','Santosh'];
}

app.controller("VectorMapCtrl",['$scope',VectorMapCtrl]);
function VectorMapCtrl($scope){
	$scope.map_data = {
			'US': {metric: 2320},
			'CN': {metric: 1000},
			'DE': {metric: 130},
			'BE': {metric: 320},
			'ES': {metric: 230},
			'IR': {metric: 800},
			'AF': {metric: 130},
			'MR': {metric: 400},
			'FR': {metric: 290},
			'IN': {metric: 3000},
			'FI': {metric: 1200},
			'AU':{metric : 1500},
			'CA' : {metric : 500},
			'GB' : {metric : 2000},
			'ZA' : {metric : 1525},
			'BR' : {metric : 905},
			'ID' : {metric : 100},
			'JP' : {metric : 200}
	};
	$scope.zoomAmount = 15;
	$scope.mapPathData = window._mapPathData; // defined in _mapdata.js
	$scope.mapDataHumanizeFn = function(val) { return val + " Visits"; };
	$scope.heatmapColors = [/*'#FFFF00','#FF0000'*/"#65BFE0","#1c7393"];
}