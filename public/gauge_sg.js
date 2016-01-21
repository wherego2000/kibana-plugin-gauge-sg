define(function (require) {
  
  // we need to load the css ourselves
  require('plugins/gauge_sg/gauge_sg.less');

  // we also need to load the controller and used by the template
  require('plugins/gauge_sg/gauge_sg_controller');

  // register the provider with the visTypes registry
  require('ui/registry/vis_types').register(MetricVisProvider);

  function MetricVisProvider(Private) {
    var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    var Schemas = Private(require('ui/Vis/Schemas'));

    // return the visType object, which kibana will use to display and configure new
    // Vis object of this type.
    return new TemplateVisType({
      name: 'gauge',
      title: 'Gauge',
      description: 'Display as Gauge Chart',
      icon: 'fa-tachometer',
      template: require('plugins/gauge_sg/gauge_sg.html'),
      params: {
        defaults: {
          titleGauge: null,
          labelGauge: null,
          heightGauge: 180,
	  minGauge: 0,
	  maxGauge: 100,
	  level1Gauge: 30,
	  colorlevel1Gauge: '#FF0000',
	  level2Gauge: 60,
	  colorlevel2Gauge: '#F97600',
	  level3Gauge: 90,
	  colorlevel3Gauge: '#F6C600',
	  level4Gauge: 100,
	  colorlevel4Gauge: '#60B044'
        },
        editor: require('plugins/gauge_sg/gauge_sg_params.html')
      },
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          min: 1,
          defaults: [
            { type: 'count', schema: 'metric' }
          ]
        }
      ])
    });
  }

  // export the provider so that the visType can be required with Private()
  return MetricVisProvider;
});
