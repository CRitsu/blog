
/**
 * Check if the object is an instance of `DOMRect` or not.
 * @param rect the result of `getBoundingClientRect` function
 */
export function isDOMRect(rect: ClientRect | DOMRect): rect is DOMRect {
  return 'x' in rect && 'y' in rect
    && 'width' in rect && 'height' in rect;
}
