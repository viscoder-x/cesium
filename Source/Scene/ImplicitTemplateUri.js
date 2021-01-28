import Check from "../Core/Check.js";
import ImplicitSubdivisionScheme from "./ImplicitSubdivisionScheme.js";

export default function ImplicitTemplateUri(uri) {
  //>>includeStart('debug', pragmas.debug);
  Check.typeOf.string("uri", uri);
  //>>includeEnd('debug');

  this._uri = uri;
}

ImplicitTemplateUri.prototype.substitute = function (implicitCoordinates) {
  var uri = this._uri;
  // TODO: use global replace? try /\{x\}/g
  uri = uri.replace("{level}", implicitCoordinates.level);
  uri = uri.replace("{x}", implicitCoordinates.x);
  uri = uri.replace("{y}", implicitCoordinates.y);
  if (
    implicitCoordinates.subdivisionScheme === ImplicitSubdivisionScheme.OCTREE
  ) {
    uri = uri.replace("{z}", implicitCoordinates.z);
  }
  return uri;
};
