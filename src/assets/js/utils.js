// Remap function (alternative to the processing map function)

export function remap(value, oldMin, oldMax, newMin, newMax) {
  return ((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
}

// Color array

export const COLORS = [
  "#7B68EE", "#DB7093", "#66CDAA", "#FFF8DC", "#F0F8FF", 
  "#BA55D3", "#4B0082", "#DEB887", "#FFFAFA", "#9400D3", 
  "#A52A2A", "#B8860B", "#FFE4B5", "#00FFFF", "#FF00FF", 
  "#AFEEEE", "#FAFAD2", "#F5DEB3", "#FF4500", "#5F9EA0", 
  "#D2691E", "#6495ED", "#D3D3D3", "#008B8B", "#FFFF00", 
  "#FFF0F5", "#E6E6FA", "#20B2AA", "#000080", "#F5F5F5", 
  "#3CB371", "#ADFF2F", "#FFEBCD", "#C71585", "#FF0000", 
  "#FFFFF0", "#7FFF00", "#00FA9A", "#FFFACD", "#00FF7F", 
  "#00FFFF", "#A9A9A9", "#ADD8E6", "#DA70D6", "#008000", 
  "#8FBC8F", "#6A5ACD", "#7B68EE", "#556B2F", "#000000",
];

