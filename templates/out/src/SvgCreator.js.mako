<%!
	import user.personal
%>/* vim:set filetype=javascript:*/
/*jsl:import Utils.js*/
/*jsl:import SvgPathAndAttributes.js*/
/*jsl:import SvgPiece.js*/
/*global SvgPathAndAttributes, SvgPiece, Utils, Class */


/**
  @class static class to have just static methods for creating pieces
  @author ${user.personal.jsdoc_author}
*/
var SvgCreator = Class.create(/** @lends SvgCreator.prototype */{
  /**
    creates a new instance
    @return {SvgCreator} the new instance.
    @author ${user.personal.jsdoc_author}
  */
  initialize: function() {
    return;
  }
});


/**
  Method which creates a piece according to color and type
  @param {Config} config A configuration to work with.
  @param {PieceColor} pieceColor the color of the piece.
  @param {PieceType} pieceType the type of the piece.
  @return {SvgPiece} the newly created piece.
  @author ${user.personal.jsdoc_author}
*/
SvgCreator.createPiece = function(config, pieceColor, pieceType) {
  // the 240.0 was found found empirically...
  var strokewidth = config.getValue('size') / 240.0;
  var stdatt = {
    'stroke-width': strokewidth,
    stroke: config.getValue('pencolor'),
    'stroke-linejoin': 'round',
    'stroke-linecap': 'round'
  };
  var svgPiece;
  if (pieceColor.isWhite()) {
    // the first 0 is the direction of the gradient in degrees (0 is horizontal)
    //'fill': '0-#fff:0-#ccc:100',
    //'fill': '0-#fff:0-#fff:50-#999:100',
    // this is not the right way to make it hidden
    //'opacity':0,
    if (config.getValue('gradients')) {
      stdatt.fill = '0-#fff:0-#fff:50-#999:100';
    } else {
      stdatt.fill = config.getValue('white_color');
    }
    if (pieceType.isRook()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L ' +
          '30,11 L 30,9 L 34,9 L 34,14', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 34,14 L 31,17 L 14,17 L 11,14', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 31,17 L 31,29.5 L 14,29.5 L 14,17', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11,14 L 34,14', stdatt));
      return svgPiece;
    }
    if (pieceType.isKnight()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18 ' +
          '24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 ' +
          'C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C ' +
          '9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 ' +
          'C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L ' +
          '18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 z',
          stdatt));
      return svgPiece;
    }
    if (pieceType.isBishop()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,' +
          '35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 ' +
          '36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,' +
          '37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 ' +
          '9,36 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C ' +
          '30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,' +
          '14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5' +
          ' 15,32 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 25 8 A 2.5 2.5 0 1 1 20,8 A 2.5 2.5 0 1 1 25 8 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M' +
          ' 20,18 L 25,18', stdatt));
      return svgPiece;
    }
    if (pieceType.isQueen()) {
      svgPiece = new SvgPiece(45);
      // the head of the crown...
      svgPiece.add(new SvgPathAndAttributes(
          'M8,12C8,13.539600717839003,6.333333333333333,14.501851166488377,' +
          '5,13.732050807568877C4.381197846482994,13.374785217660714,4,' +
          '12.714531179816328,4,12C4,10.460399282160997,5.666666666666667,' +
          '9.498148833511623,7,10.267949192431123C7.618802153517006,' +
          '10.625214782339286,8,11.285468820183672,8,12C8,12,8,12,8,12',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M24.5,7.5C24.5,9.039600717839003,22.833333333333332,' +
          '10.001851166488377,21.5,9.232050807568877C20.881197846482994,' +
          '8.874785217660714,20.5,8.214531179816328,20.5,7.5C20.5,' +
          '5.9603992821609975,22.166666666666668,4.998148833511623,23.5,' +
          '5.767949192431123C24.118802153517006,6.125214782339286,24.5,' +
          '6.785468820183672,24.5,7.5C24.5,7.5,24.5,7.5,24.5,7.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M41,12C41,13.539600717839003,39.333333333333336,' +
          '14.501851166488377,38,13.732050807568877C37.38119784648299,' +
          '13.374785217660714,37,12.714531179816328,37,12C37,' +
          '10.460399282160997,38.666666666666664,9.498148833511623,40,' +
          '10.267949192431123C40.61880215351701,10.625214782339286,41,' +
          '11.285468820183672,41,12C41,12,41,12,41,12', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M16,8.5C16,10.039600717839003,14.333333333333332,' +
          '11.001851166488377,13,10.232050807568877C12.381197846482994,' +
          '9.874785217660714,12,9.214531179816328,12,8.5C12,' +
          '6.9603992821609975,13.666666666666668,5.998148833511623,15,' +
          '6.767949192431123C15.618802153517006,7.125214782339286,16,' +
          '7.785468820183672,16,8.5C16,8.5,16,8.5,16,8.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M33,9C33,10.539600717839003,31.333333333333332,' +
          '11.501851166488377,30,10.732050807568877C29.381197846482994,' +
          '10.374785217660714,29,9.714531179816328,29,9C29,' +
          '7.4603992821609975,30.666666666666668,6.498148833511623,32,' +
          '7.267949192431123C32.61880215351701,7.625214782339286,33,' +
          '8.285468820183672,33,9C33,9,33,9,33,9', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,' +
          '24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C ' +
          '10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5' +
          ' 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,' +
          '33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5' +
          ' 17.5,24.5 9,26 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,30 C 15,29 30,29 33.5,30', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 12,33.5 C 18,32.5 27,32.5 33,33.5', stdatt));
      return svgPiece;
    }
    if (pieceType.isKing()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 22.5,11.63 L 22.5,6', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 20,8 L 25,8', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 ' +
          '22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 ' +
          '41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L ' +
          '22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5' +
          ' L 11.5,37 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,30 C 17,27 27,27 32.5,30', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,37 C 17,34 27,34 32.5,37', stdatt));
      return svgPiece;
    }
    if (pieceType.isPawn()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 ' +
          '18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 ' +
          '16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 ' +
          'L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 ' +
          '28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,' +
          '14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z', stdatt));
      return svgPiece;
    }
  }
  if (pieceColor.isBlack()) {
    if (config.getValue('gradients')) {
      //stdatt.fill = '0-#000:0-#222:50-#555:100';
      stdatt.fill = '0-#555:0-#222:50-#000:100';
    } else {
      stdatt.fill = config.getValue('black_color');
    }
    if (pieceType.isRook()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L ' +
          '30,11 L 30,9 L 34,9 L 34,14 L 11,14 z', stdatt));
      stdatt = Utils.clone(stdatt);
      stdatt.stroke = '#fff';
      svgPiece.add(new SvgPathAndAttributes(
          'M 12,35.5 L 33,35.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 13,31.5 L 32,31.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 14,29.5 L 31,29.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 14,16.5 L 31,16.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11,14 L 34,14', stdatt));
      return svgPiece;
    }
    if (pieceType.isKnight()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 ' +
          '11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 ' +
          'C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 ' +
          '14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 ' +
          '16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10',
          stdatt));
      stdatt = Utils.clone(stdatt);
      stdatt.fill = '#fff';
      stdatt.stroke = '#fff';
      svgPiece.add(new SvgPathAndAttributes(
          'M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 z',
          stdatt));
      stdatt = Utils.clone(stdatt);
      stdatt.fill = '#fff';
      stdatt.stroke = 'none';
      svgPiece.add(new SvgPathAndAttributes(
          'M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,' +
          '18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 ' +
          'L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,' +
          '11.02 25.06,10.5 L 24.55,10.4 z', stdatt));
      return svgPiece;
    }
    if (pieceType.isBishop()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 ' +
          '32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 ' +
          '37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C ' +
          '19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 ' +
          '6,38 C 7.354,36.06 9,36 9,36 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 ' +
          '30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 ' +
          '22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 ' +
          '15,30 C 15,30 14.5,30.5 15,32 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 25 8 A 2.5 2.5 0 1 1 20,8 A 2.5 2.5 0 1 1 25 8 z', stdatt));
      stdatt = Utils.clone(stdatt);
      stdatt.stroke = '#fff';
      svgPiece.add(new SvgPathAndAttributes(
          'M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M ' +
          '20,18 L 25,18', stdatt));
      return svgPiece;
    }
    if (pieceType.isQueen()) {
      svgPiece = new SvgPiece(45);
      // the head of the crown...
      svgPiece.add(new SvgPathAndAttributes(
          'M8,12C8,13.539600717839003,6.333333333333333,14.501851166488377,' +
          '5,13.732050807568877C4.381197846482994,13.374785217660714,4,' +
          '12.714531179816328,4,12C4,10.460399282160997,5.666666666666667,' +
          '9.498148833511623,7,10.267949192431123C7.618802153517006,' +
          '10.625214782339286,8,11.285468820183672,8,12C8,12,8,12,8,12',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M24.5,7.5C24.5,9.039600717839003,22.833333333333332,' +
          '10.001851166488377,21.5,9.232050807568877C20.881197846482994,' +
          '8.874785217660714,20.5,8.214531179816328,20.5,7.5C20.5,' +
          '5.9603992821609975,22.166666666666668,4.998148833511623,23.5,' +
          '5.767949192431123C24.118802153517006,6.125214782339286,24.5,' +
          '6.785468820183672,24.5,7.5C24.5,7.5,24.5,7.5,24.5,7.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M41,12C41,13.539600717839003,39.333333333333336,' +
          '14.501851166488377,38,13.732050807568877C37.38119784648299,' +
          '13.374785217660714,37,12.714531179816328,37,12C37,' +
          '10.460399282160997,38.666666666666664,9.498148833511623,40,' +
          '10.267949192431123C40.61880215351701,10.625214782339286,' +
          '41,11.285468820183672,41,12C41,12,41,12,41,12', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M16,8.5C16,10.039600717839003,14.333333333333332,' +
          '11.001851166488377,13,10.232050807568877C12.381197846482994,' +
          '9.874785217660714,12,9.214531179816328,12,8.5C12,' +
          '6.9603992821609975,13.666666666666668,5.998148833511623,' +
          '15,6.767949192431123C15.618802153517006,7.125214782339286,16,' +
          '7.785468820183672,16,8.5C16,8.5,16,8.5,16,8.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M33,9C33,10.539600717839003,31.333333333333332,11.501851166488377,' +
          '30,10.732050807568877C29.381197846482994,10.374785217660714,29,' +
          '9.714531179816328,29,9C29,7.4603992821609975,30.666666666666668,' +
          '6.498148833511623,32,7.267949192431123C32.61880215351701,' +
          '7.625214782339286,33,8.285468820183672,33,9C33,9,33,9,33,9',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 ' +
          'L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 ' +
          'L 9,26 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 ' +
          'C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 ' +
          '27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 ' +
          '33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C ' +
          '27.5,24.5 17.5,24.5 9,26 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11,38.5 A 35,35 1 0 0 34,38.5', stdatt));
      stdatt = Utils.clone(stdatt);
      stdatt.stroke = '#fff';
      svgPiece.add(new SvgPathAndAttributes(
          'M 11,29 A 35,35 1 0 1 34,29', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 12.5,31.5 L 32.5,31.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,34.5 A 35,35 1 0 0 33.5,34.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 10.5,37.5 A 35,35 1 0 0 34.5,37.5', stdatt));
      return svgPiece;
    }
    if (pieceType.isKing()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes('M 22.5,11.63 L 22.5,6', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 ' +
          '24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C ' +
          '18,17.5 22.5,25 22.5,25', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,37 C 17,40.5 27,40.5 32.5,37 L ' +
          '32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C ' +
          '34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 ' +
          'C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 ' +
          '11.5,29.5 L 11.5,37 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes('M 20,8 L 25,8', stdatt));
      stdatt = Utils.clone(stdatt);
      stdatt.stroke = '#fff';
      svgPiece.add(new SvgPathAndAttributes(
          'M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 ' +
          '25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 ' +
          '6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 ' +
          '27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37', stdatt));
      return svgPiece;
    }
    if (pieceType.isPawn()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes('M 22,9 C 19.79,9 18,10.79 18,13 ' +
          'C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 ' +
          '15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 ' +
          '17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 ' +
          'L 33.5,39.5 C 33.5,31.58 29.09,27.09 ' +
          '26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C ' +
          '28.5,18.59 27.17,16.5 25.22,15.38 C ' +
          '25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 ' +
          '22,9 z', stdatt));
      return svgPiece;
    }
  }
  throw 'unknown piece ' + pieceType;
};
