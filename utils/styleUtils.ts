/**
 * Cleans up CSS style conflicts between shorthand and longhand properties
 * This prevents React warnings about conflicting style properties
 */
export const cleanStyleConflicts = (styleObj: Record<string, any>): Record<string, any> => {
    const cleaned = { ...styleObj };
    
    // Remove shorthand properties when longhand properties are present
    if (cleaned.backgroundSize || cleaned.backgroundPosition || cleaned.backgroundRepeat || 
        cleaned.backgroundAttachment || cleaned.backgroundOrigin || cleaned.backgroundClip) {
        delete cleaned.background;
    }
    
    if (cleaned.borderWidth || cleaned.borderStyle || cleaned.borderColor) {
        delete cleaned.border;
    }
    
    if (cleaned.borderTopWidth || cleaned.borderTopStyle || cleaned.borderTopColor) {
        delete cleaned.borderTop;
    }
    
    if (cleaned.borderRightWidth || cleaned.borderRightStyle || cleaned.borderRightColor) {
        delete cleaned.borderRight;
    }
    
    if (cleaned.borderBottomWidth || cleaned.borderBottomStyle || cleaned.borderBottomColor) {
        delete cleaned.borderBottom;
    }
    
    if (cleaned.borderLeftWidth || cleaned.borderLeftStyle || cleaned.borderLeftColor) {
        delete cleaned.borderLeft;
    }
    
    if (cleaned.marginTop || cleaned.marginRight || cleaned.marginBottom || cleaned.marginLeft) {
        delete cleaned.margin;
    }
    
    if (cleaned.paddingTop || cleaned.paddingRight || cleaned.paddingBottom || cleaned.paddingLeft) {
        delete cleaned.padding;
    }
    
    if (cleaned.fontSize || cleaned.fontFamily || cleaned.fontWeight || cleaned.fontStyle || 
        cleaned.fontVariant || cleaned.lineHeight) {
        delete cleaned.font;
    }
    
    if (cleaned.flexGrow || cleaned.flexShrink || cleaned.flexBasis) {
        delete cleaned.flex;
    }
    
    return cleaned;
};
