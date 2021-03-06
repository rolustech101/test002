nv.models.axis = function() {

  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var scale = d3.scale.linear(),
      axisLabelText = null,
      showMaxMin = true,
      highlightZero = true,
      direction = 'ltr',
      wrapTicks = false,
      staggerTicks = false,
      rotateTicks = 30, //one of (rotateTicks, staggerTicks, wrapTicks)
      reduceXTicks = false, // if false a tick will show for every data point
      rotateYLabel = true,
      isOrdinal = false,
      textAnchor = null,
      ticks = null,
      axisLabelDistance = 8; //The larger this number is, the closer the axis label is to the axis.

  // Public Read-only Variables
  //------------------------------------------------------------
  var margin = {top: 0, right: 0, bottom: 0, left: 0},
      thickness = 0,
      labelThickness = null;

  var axis = d3.svg.axisStatic()
        .scale(scale)
        .orient('bottom')
        .tickFormat(function(d) { return d; });

  // Private Variables
  //------------------------------------------------------------
  var scale0;

  //============================================================

  function chart(selection) {
    selection.each(function(data) {

      var container = d3.select(this);
      var scaleCalc = axis.scale().copy();
      var marginCalc = {top: 0, right: 0, bottom: 0, left: 0};

      // Private
      scale0 = scale0 || axis.scale();

      var vertical = axis.orient() === 'left' || axis.orient() === 'right' ? true : false,
          mirror = axis.orient() === 'left' || axis.orient() === 'top' ? -1 : 1,
          labelAttr = {},
          anchor = null,
          tickValueArray = [],
          maxMinRange = [],
          maxTickWidth = 0,
          maxTickHeight = 0,
          wrapTickHeight = 0,
          fmt = axis.tickFormat(),
          extent = getRangeExtent(),
          scaleWidth = Math.abs(extent[1] - extent[0]),
          tickSpacing = 0;

      //------------------------------------------------------------
      // reset public readonly variables
      thickness = 0;
      labelThickness = null;

      if (ticks !== null) {
        axis.ticks(ticks);
      } else if (vertical) {
        axis.ticks(Math.ceil(scaleWidth / 48));
      } else {
        axis.ticks(Math.ceil(scaleWidth / 100));
      }

      // test to see if rotateTicks was passed as a boolean
      if (rotateTicks && !isFinite(String(rotateTicks))) {
        rotateTicks = 30;
      }

      // ordinal scales do not have max-min values
      if (isOrdinal) {
        showMaxMin = false;
      }

      if (fmt === null) {
        fmt = scale0.tickFormat();
      }

      //------------------------------------------------------------
      // Setup containers and skeleton of chart
      var wrap = container.selectAll('g.nv-wrap.nv-axis').data([data]),
          gEnter = wrap.enter()
            .append('g').attr('class', 'nvd3 nv-wrap nv-axis')
            .append('g').attr('class', 'nv-axis-inner'),
          g = wrap.select('.nv-axis-inner');

      g.call(axis);

      //------------------------------------------------------------
      // Axis ticks
      var axisTicks = g.selectAll('g.tick');

      //------------------------------------------------------------
      // Min Max ticks
      var dataMaxMin = showMaxMin ? d3.extent(scale.domain()) : [];
      var axisMaxMin = g.selectAll('g.nv-axisMaxMin').data(dataMaxMin);
      var enterMaxMin = axisMaxMin.enter().append('g').attr('class', 'nv-axisMaxMin');
      enterMaxMin.append('text')
        .style('opacity', 0);
      enterMaxMin.append('line')
        .style('opacity', 0);
      axisMaxMin.exit().remove();

      if (showMaxMin) {
        axisMaxMin.select('text')
          .text(function(d, i) {
            var v = fmt(d, i, false);
            return ('' + v).match('NaN') ? '' : v;
          });
      }

      //------------------------------------------------------------
      // Axis and Maxmin tick text
      var tickText = g.selectAll('g.tick, g.nv-axisMaxMin').select('text');
      tickText.each(function(d, i) {
          tickValueArray.push(d3.select(this).text());
        });

      //------------------------------------------------------------
      // Axis label
      var axisLabelData = !!axisLabelText ? [axisLabelText] : [];
      var axisLabel = wrap.selectAll('text.nv-axislabel').data(axisLabelData);
      axisLabel.enter().append('text').attr('class', 'nv-axislabel')
        .text(function(d) { return d; });
      axisLabel.exit().remove();

      //------------------------------------------------------------
      // Private functions

      function getStepInterval() {
        return scaleCalc.range().length > 1 ? Math.abs(scaleCalc.range()[1] - scaleCalc.range()[0]) : 0;
      }

      function getPaddingRatio() {
        return scaleCalc.range().length > 1 ? Math.max(0.25, 1 - d3.round(scaleCalc.rangeBand() / getStepInterval(), 2)) : 0;
      }

      function getRangeExtent() {
        return typeof scaleCalc.rangeExtent === 'function' ? scaleCalc.rangeExtent() : scaleCalc.range();
      }

      function getBarWidth() {
        return isOrdinal ? scaleCalc.rangeBand() : 0;
      }

      function getOuterPadding() {
        return isOrdinal ? scaleCalc.range()[0] : 0;
      }

      function getOuterPaddingRatio() {
        return getOuterPadding() / getTickSpacing();
      }

      function getTickSpacing() {
        var tickSpacing = 0,
            tickArray;
        if (isOrdinal) {
          tickSpacing = scaleCalc.range().length > 1 ? Math.abs(scaleCalc.range()[1] - scaleCalc.range()[0]) : d3.max(getRangeExtent()) / 2;
        } else {
          tickArray = scaleCalc.ticks(axisTicks.size());
          tickSpacing = scaleCalc(tickArray[tickArray.length - 1]) - scaleCalc(tickArray[tickArray.length - 2]);
        }
        return tickSpacing;
      }

      function rtlTextAnchor(anchor) {
        var rtlAnchor = anchor;
        if (direction === 'rtl') {
          if (anchor === 'start') {
            rtlAnchor = 'end';
          } else if (anchor === 'end') {
            rtlAnchor = 'start';
          }
        }
        return rtlAnchor;
      }

      function defaultThickness() {
        return axis.tickPadding() + (!!axisLabelText ? axisLabelDistance : 0);
      }

      // Calculate the longest tick width and height
      function calcMaxLabelWidth() {
        var maxW = 0,
            maxH = 0;
        tickText.each(function(d, i) {
          var bbox = this.getBoundingClientRect(),
              w = parseInt(bbox.width, 10),
              h = parseInt(bbox.height / 1.2, 10);
          if (w > maxW) {
            maxW = w;
          }
          if (h > maxH) {
            maxH = h;
          }
        });
        maxTickWidth = maxW;
        maxTickHeight = maxH;
      }

      function labelCollision(s) {
        // this resets the maxTickWidth for label collision detection
        calcMaxLabelWidth();
        tickSpacing = getTickSpacing() * s;
        return tickSpacing < maxTickWidth;
      }


      function recalcMargin(a) {
        var normRotation = a ? (a + 360) % 360 : 0, // Normalize rotation: (-30 + 360) % 360 = 330; (30 + 360) % 360 = 30
            isLeft = normRotation > 90 && normRotation < 270,
            outerPadding = getOuterPadding(),
            barWidth = getBarWidth() / 2.0,
            calcTicks = showMaxMin ? axisMaxMin.select('text') : axisTicks.select('text'),
            l = calcTicks.size() - 1;

        calcTicks.each(function(d, i) {
          var textWidth = Math.ceil(this.getBoundingClientRect().width),
              tickPosition = showMaxMin ? (i ? extent[1] : extent[0]) : (scaleCalc(d) + (isOrdinal ? barWidth : 0)),
              hangover = 0;
          // i==1, max position
          // i==0, min position
          if (normRotation) {
            if (i === l && !isLeft) {
              hangover = isOrdinal ? barWidth + outerPadding : showMaxMin ? 0 : extent[1] - scaleCalc(d);
              marginCalc.right = Math.max(textWidth - hangover - 11, 0); //TODO: why hardcoded 11?
            } else if (i === 0 && isLeft) {
              marginCalc.left = Math.max(textWidth - barWidth - outerPadding, 0); //TODO:
            }
          } else {
            if (i === l) {
              hangover = tickPosition + textWidth / 2.0 - extent[1];
              marginCalc.right = Math.max(hangover, 0);
            } else if (i === 0) {
              hangover = textWidth / 2.0;
              marginCalc.left = Math.max(hangover, 0);
            }
          }
        });

        // modify scale range
        if (!isOrdinal && (marginCalc.right !== margin.right || marginCalc.left !== margin.left)) {
          // TODO: this is wrong
          var change = (marginCalc.right > margin.right ? marginCalc.right - margin.right : 0);
              change += (marginCalc.left > margin.left ? marginCalc.left - margin.left : 0);

          var newExtent = [extent[0], extent[1] - change]; // reduce operable width of axis by margins

          scaleCalc.range(newExtent);

          extent = getRangeExtent();
          scaleWidth = Math.abs(extent[1] - extent[0]);

          axis
            .scale(scaleCalc);
          g.call(axis);
        }
      }

      function resetTicks() {
        scaleCalc = scale.copy();
        marginCalc = {top: 0, right: 0, bottom: 0, left: 0};

        tickText.selectAll('tspan').remove();
        tickText
          .attr('dy', vertical ? '.32em' : 0.355 + 0.355 * mirror + 'em')
          .attr('x', vertical ? axis.tickPadding() * mirror : 0)
          .attr('y', vertical ? 0 : axis.tickPadding() * mirror)
          .attr('transform', 'translate(0,0)')
          .text(function(d, i) { return tickValueArray[i]; })
          .style('opacity', 1);

        // if (showMaxMin) {
        //   axisMaxMin
        //     .style('opacity', 0);
        //   axisMaxMin.select('text,line')
        //     .style('opacity', 0);
        // }

        calcMaxLabelWidth();
        thickness = defaultThickness() + maxTickHeight;

        axis
          .scale(scale);

        extent = getRangeExtent();
        scaleWidth = Math.abs(extent[1] - extent[0]);
      }

      function handleWrap() {
        wrapTickHeight = maxTickHeight;

        tickText.each(function(d, i) {
          var textContent = fmt(d, i, true),
              textNode = d3.select(this),
              textArray = textContent && textContent !== '' ? textContent.replace('/', '/ ').split(' ') : [],
              i = 0,
              l = textArray.length,
              dy = mirror === 1 ? 0.71 : -1;

          // do wrapping if needed
          this.textContent = '';

          var textString,
              textSpan = textNode.append('tspan')
                .text(textArray[i] + ' ')
                .attr('dy', dy + 'em')
                .attr('x', 0);

          i += 1;
          dy = 1;

          while (i < l) {
            textSpan = textNode.append('tspan')
              .text(textArray[i] + ' ')
              .attr('dy', dy + 'em')
              .attr('x', 0);

            i += 1;

            while (i < l) {
              textString = textSpan.text();
              textSpan.text(textString + ' ' + textArray[i]);
              if (this.getBoundingClientRect().width <= tickSpacing) {
                i += 1;
              } else {
                textSpan.text(textString);
                break;
              }
            }
          }

          var bbox = this.getBoundingClientRect();
          wrapTickHeight = Math.max(bbox.height - maxTickHeight * 0.315, wrapTickHeight);
        });
      }

      function handleStagger() {
        var j = 0;
        tickText
          // .filter(function() { return d3.select(this).style('opacity') !== 0; })
          .attr('transform', function(d, i) {
            if (d) {
              j += 1;
            }
            return 'translate(0,' + ((d ? j : 0) % 2 * (maxTickHeight + 2)) + ')';
          });
      }

      function handleRotation(a) {
        var normRotation = (a + 360) % 360, // Normalize rotation: (-30 + 360) % 360 = 330; (30 + 360) % 360 = 30
            isLeft = normRotation > 90 && normRotation < 270,
            tickAnchor = direction === 'rtl' ? isLeft ? 'start' : 'end' : isLeft ? 'end' : 'start',
            //Convert to radians before calculating sin.
            sin = Math.abs(Math.sin(a * Math.PI / 180));

        thickness = defaultThickness();
        thickness += sin ? sin * maxTickWidth : maxTickWidth;
        thickness += sin ? sin * maxTickHeight : 0;

        //Rotate all tickText
        tickText
          .attr('transform', function(d, i, j) {
            return 'translate(0,' + axis.tickPadding() + ') rotate(' + a + ')';
          })
          .attr('y', '0')
          .style('text-anchor', tickAnchor);
      }


      //------------------------------------------------------------
      // Tick label handling

      var wrapSucceeded = false,
          staggerSucceeded = false,
          rotateSucceeded = false;

      resetTicks();

      if (vertical) {

          calcMaxLabelWidth();
          thickness = defaultThickness() + maxTickWidth;
          anchor = rtlTextAnchor(textAnchor || (axis.orient() === 'left' ? 'end' : 'start'));

          tickText
            .style('text-anchor', anchor);

          labelAttr = {
            x: (rotateYLabel ? scaleWidth / 2 : axis.tickPadding()) * mirror,
            y: rotateYLabel ? -thickness : -10
          };

      } else {

          // if (reduceXTicks) {
          //   axisTicks.each(function(d, i) {
          //       d3.select(this).selectAll('text,line')
          //         .style('opacity', i % Math.ceil(data[0].values.length / (scaleWidth / 100)) !== 0 ? 0 : 1);
          //     });
          // }

          recalcMargin();

          if (labelCollision(1)) {

            // if wrap is enabled, try it first (for ordinal scales only)
            if (wrapTicks) {
              resetTicks();
              handleWrap();
              recalcMargin();
              handleWrap();
              // check to see if we still have collisions
              if (!labelCollision(1)) {
                wrapSucceeded = true;
                thickness = defaultThickness() + wrapTickHeight;
              }
            }

            // wrapping failed so fall back to stagger if enabled
            if (!wrapSucceeded && staggerTicks) {
              resetTicks();
              handleStagger();
              recalcMargin();
              handleStagger();
              // check to see if we still have collisions
              if (!labelCollision(2)) {
                staggerSucceeded = true;
                thickness = defaultThickness() + 2 * maxTickHeight; //TODO: handle more than two lines of wrapping
              }
            }

            // if we still have a collision
            // add a test in the following if block to support opt-out of rotate method
            if (!wrapSucceeded && !staggerSucceeded) {
              if (!rotateTicks) {
                rotateTicks = 30;
              }
              resetTicks();
              handleRotation(rotateTicks);
              recalcMargin(rotateTicks);
              handleRotation(rotateTicks);
              rotateSucceeded = true;
              if (showMaxMin) {
                axisMaxMin.select('text')
                  .attr('transform', 'rotate(' + rotateTicks + ' 0,0)');
              }
            }

          } else {
            thickness = defaultThickness() + maxTickHeight;
          }

          anchor = rtlTextAnchor(rotateSucceeded ? (rotateTicks % 360 > 0 ? 'start' : 'end') : textAnchor || 'middle');

          labelAttr = {
            x: scaleWidth / 2,
            y: thickness * mirror
          };
      }

      //------------------------------------------------------------
      // Min Max values

      if (showMaxMin) {

        axisMaxMin
          .style('opacity', 1)
          .attr('transform', function(d, i) {
            // return 'translate(' + (scale(d) + (isOrdinal ? scale.rangeBand() / 2 : (d > 0 ? -8 : +4))) + ',0)';
            var trans = vertical ? '0,' + scaleCalc(d) : scaleCalc(d) + ',0';
            return 'translate(' + trans + ')';
          });

        axisMaxMin.select('text')
          .attr('dy', function(d, i) {
            var dy = vertical ? (i ? 0.515 + 0.195 * mirror : 0) : 0.355 + 0.355 * mirror;
            return dy + 'em';
          })
          .style('text-anchor', anchor)
          .style('opacity', 1);

        axisMaxMin.select('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('y2', vertical ? 0 : axis.tickSize() * mirror)
          .attr('x2', vertical ? axis.tickSize() * mirror : 0)
          .style('opacity', function(d, i) {
            return axis.orient() === 'left' || axis.orient() === 'bottom' ? (i ? 1 : 0) : (i ? 0 : 1);
          }); // only max line

        if (vertical) {
          maxMinRange = [scaleCalc.range()[1] + 10, scaleCalc.range()[0] - 10]; //TODO: why is this hardcoded?
          //if Max and Min = 0 only show min, Issue #281
          if (scaleCalc.domain()[0] === scaleCalc.domain()[1] && scaleCalc.domain()[0] === 0) {
            axisMaxMin
              .style('opacity', function(d, i) { return i ? 0 : 1; });
          }
        } else {
          axisMaxMin.each(function(d, i) {
              var width = Math.ceil(this.getBoundingClientRect().width);
              // i==1, max position
              // i==0, min position
              //assuming the max and min labels are as wide as the next tick (with an extra 4 pixels just in case)
              maxMinRange.push(scaleCalc(d) + (rotateSucceeded ? 10 : width + 4) * (i ? -1 : 1));
            });
        }

        //check if max and min overlap other values, if so, hide the values that overlap
        axisTicks.each(function(d, i) {
            var tick = d3.select(this);
            tick.select('line')
              .style('opacity', 1);
            if (scaleCalc(d) < maxMinRange[0] || scaleCalc(d) > maxMinRange[1]) {
              tick.select('text')
                .style('opacity', 0);
              tick.select('line')
                .style('opacity', 0);
              // accounts for minor floating point errors... though could be problematic if the scale is EXTREMELY SMALL
              if (d < 1e-10 && d > -1e-10) { // Don't remove the ZERO line!!
                tick.select('line')
                  .style('opacity', 0);
              }
            }
          });

      } else {

        //highlight zero line ... Maybe should not be an option and should just be in CSS?
        axisTicks.select('line')
          .filter(function(d) {
            //this is because sometimes the 0 tick is a very small fraction, TODO: think of cleaner technique
            return !parseFloat(Math.round(d * 100000) / 1000000);
          })
          .classed('zero', highlightZero);

        // hide zero line if same as domain line
        axisTicks.select('line')
          .style('opacity', function(d, i) {
            if (axis.orient() === 'left' || axis.orient() === 'bottom') {
              return scaleCalc(d) === extent[0] ? 0 : 1;
            } else {
              return scaleCalc(d) === extent[1] ? 0 : 1;
            }
          });

      }

      //------------------------------------------------------------
      // Axis label

      if (!!axisLabelText) {
        axisLabel
          .attr('x', labelAttr.x)
          .attr('y', labelAttr.y)
          .attr('dy', (vertical ? 0 : 0.355 + 0.355 * mirror) + 'em')
          .attr('transform', vertical && rotateYLabel ? 'rotate(' + (90 * mirror) + ')' : '')
          .style('text-anchor', vertical && !rotateYLabel ? anchor : 'middle');

        axisLabel.each(function(d, i) {
          labelThickness += vertical ?
            parseInt(this.getBoundingClientRect().width / 1.3, 10) :
            parseInt(this.getBoundingClientRect().height / 1.3, 10);
        });

        thickness += labelThickness;
      }



      // set tick line position to half pixels to prevent anti-aliasing
      // g.selectAll('g.tick, g.nv-axisMaxMin')
      //   .attr('transform', function(d) {
      //     var components = d3.transform(d3.select(this).attr('transform')).translate;
      //     var trans = [
      //         vertical ? components[0] : (parseInt(components[0], 10) + 0.5),
      //         vertical ? (parseInt(components[1], 10) + 0.5) : components[1]
      //       ];
      //     return 'translate(' + trans[0] + ',' + trans[1] + ')';
      //   });

      //store old scales for use in transitions on update
      scale0 = scale.copy();

      margin = {top: marginCalc.top, right: marginCalc.right, bottom: marginCalc.bottom, left: marginCalc.left};
      margin[axis.orient()] = thickness;

      chart.labelThickness = function() {
        return labelThickness;
      };

      chart.resizeTickLines = function(dim) {
        g.selectAll('g.tick, g.nv-axisMaxMin').select('line')
          .attr(vertical ? 'x2' : 'y2', axis.tickSize() * mirror);
      };
    });

    return chart;
  }


  //============================================================
  // Expose Public Variables
  //------------------------------------------------------------

  // expose chart's sub-components
  chart.axis = axis;

  d3.rebind(chart, axis, 'orient', 'tickValues', 'tickSubdivide', 'tickSize', 'tickPadding', 'tickFormat');
  d3.rebind(chart, scale, 'domain', 'range', 'rangeBand', 'rangeBands'); //these are also accessible by chart.scale(), but added common ones directly for ease of use

  // read only
  chart.width = function(_) {
    if (!arguments.length) {
      return thickness;
    }
    return chart;
  };

  // read only
  chart.height = function(_) {
    if (!arguments.length) {
      return thickness;
    }
    return chart;
  };

  chart.margin = function(_) {
    if (!arguments.length) {
      return margin;
    }
    margin = _;
    return chart;
  };

  chart.ticks = function(_) {
    if (!arguments.length) {
      return ticks;
    }
    ticks = _;
    return chart;
  };

  chart.axisLabel = function(_) {
    if (!arguments.length) {
      return axisLabelText;
    }
    axisLabelText = _;
    return chart;
  };

  chart.showMaxMin = function(_) {
    if (!arguments.length) {
      return showMaxMin;
    }
    showMaxMin = _;
    return chart;
  };

  chart.highlightZero = function(_) {
    if (!arguments.length) {
      return highlightZero;
    }
    highlightZero = _;
    return chart;
  };

  chart.scale = function(_) {
    if (!arguments.length) {
      return scale;
    }
    scale = _;
    axis.scale(scale);
    isOrdinal = typeof scale.rangeBands === 'function';
    d3.rebind(chart, scale, 'domain', 'range', 'rangeBand', 'rangeBands');
    return chart;
  };

  chart.wrapTicks = function(_) {
    if (!arguments.length) {
      return wrapTicks;
    }
    wrapTicks = _;
    return chart;
  };

  chart.rotateTicks = function(_) {
    if (!arguments.length) {
      return rotateTicks;
    }
    rotateTicks = _;
    return chart;
  };

  chart.staggerTicks = function(_) {
    if (!arguments.length) {
      return staggerTicks;
    }
    staggerTicks = _;
    return chart;
  };

  chart.reduceXTicks = function(_) {
    if (!arguments.length) {
      return reduceXTicks;
    }
    reduceXTicks = _;
    return chart;
  };

  chart.rotateYLabel = function(_) {
    if (!arguments.length) {
      return rotateYLabel;
    }
    rotateYLabel = _;
    return chart;
  };

  chart.axisLabelDistance = function(_) {
    if (!arguments.length) {
      return axisLabelDistance;
    }
    axisLabelDistance = _;
    return chart;
  };

  chart.maxTickWidth = function(_) {
    if (!arguments.length) {
      return maxTickWidth;
    }
    maxTickWidth = _;
    return chart;
  };

  chart.textAnchor = function(_) {
    if (!arguments.length) {
      return textAnchor;
    }
    textAnchor = _;
    return chart;
  };

  chart.direction = function(_) {
    if (!arguments.length) {
      return direction;
    }
    direction = _;
    return chart;
  };

  //============================================================


  return chart;
};
