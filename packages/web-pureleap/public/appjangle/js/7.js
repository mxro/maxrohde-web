let difficulties,
  features,
  renderRow,
  renderTable,
  template_row,
  template_table;

difficulties = [
  {
    text: 'We model data for computers not humans.',
    details: 'http://slicnet.com/mxrogm/mxrogm/data/stream/2014/1/15/n2/7',
  },
  {
    text: 'Clients cannot query and manipulate shared data.',
    details: 'http://slicnet.com/mxrogm/mxrogm/data/stream/2014/1/15/n5/7',
  },
  {
    text: 'Data is not connected across databases.',
    details: 'http://slicnet.com/mxrogm/mxrogm/data/stream/2014/1/15/n6/7',
  },
  {
    text: 'A lot of code focusses on infrastructure not logic.',
    details: 'http://slicnet.com/mxrogm/mxrogm/data/stream/2014/1/15/n7/7',
  },
];

features = [
  {
    text: 'Model data as hyperlinked networks.',
    details: 'http://slicnet.com/mxrogm/mxrogm/data/stream/2014/1/15/n9/7',
  },
  {
    text: 'Work with shared data as if it was local data.',
    details: 'http://slicnet.com/mxrogm/mxrogm/data/stream/2014/1/17/n2/7',
  },
  {
    text: 'Integrate unlimited data in one database.',
    details: 'http://slicnet.com/mxrogm/mxrogm/data/stream/2014/1/17/n3/7',
  },
  {
    text: 'Build on a productive yet open platform.',
    details: 'http://slicnet.com/mxrogm/mxrogm/data/stream/2014/1/18/n1/7',
  },
];

template_row = function () {
  return tr(
    'mousePointer moreContent',
    {
      'data-details': this.details,
    },
    function () {
      td(
        'font',
        {
          style: 'border: none',
        },
        function () {
          return this.text;
        }
      );
      return td(
        'buttonRow',
        {
          style: 'border: none',
        },
        function () {
          return span({
            class: 'glyphicon glyphicon-chevron-right',
          });
        }
      );
    }
  );
};

template_table = function () {
  return table('table table-hover', function () {
    return this.content;
  });
};

renderRow = function (item) {
  return CoffeeKup.render(template_row, {
    text: item.text,
    details: item.details,
  });
};

renderTable = function (texts) {
  let content, text;
  content = (function () {
    let _i, _len, _results;
    _results = [];
    for (_i = 0, _len = texts.length; _i < _len; _i++) {
      text = texts[_i];
      _results.push(renderRow(text));
    }
    return _results;
  })().join('');
  return CoffeeKup.render(template_table, {
    content: content,
  });
};

window.Home = window.Home || {};

window.Home.renderDifficulties = function () {
  return renderTable(difficulties);
};

window.Home.renderFeatures = function () {
  return renderTable(features);
};
