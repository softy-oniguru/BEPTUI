// bertui/src/utils/meta-extractor.js
export function extractMetaFromSource(code) {
  try {
    if (!code.includes('export const meta')) {
      return null;
    }
    
    const metaStart = code.indexOf('export const meta = {');
    if (metaStart === -1) return null;
    
    let braceCount = 0;
    let inString = false;
    let stringChar = '';
    let metaEnd = -1;
    
    for (let i = metaStart + 'export const meta = {'.length; i < code.length; i++) {
      const char = code[i];
      const prevChar = i > 0 ? code[i - 1] : '';
      
      if (!inString && (char === '"' || char === "'" || char === '`')) {
        inString = true;
        stringChar = char;
      } else if (inString && char === stringChar && prevChar !== '\\') {
        inString = false;
      }
      
      if (!inString) {
        if (char === '{') braceCount++;
        if (char === '}') {
          if (braceCount === 0) {
            metaEnd = i;
            break;
          }
          braceCount--;
        }
      }
    }
    
    if (metaEnd === -1) return null;
    
    const metaString = code.substring(metaStart + 'export const meta = {'.length - 1, metaEnd + 1);
    const meta = {};
    const pairs = metaString.match(/(\w+)\s*:\s*(['"`][^'"`]*['"`])/g) || [];
    
    pairs.forEach(pair => {
      const colonIndex = pair.indexOf(':');
      if (colonIndex === -1) return;
      
      const key = pair.substring(0, colonIndex).trim();
      const value = pair.substring(colonIndex + 1).trim().slice(1, -1);
      
      if (key && value) {
        meta[key] = value;
      }
    });
    
    return Object.keys(meta).length > 0 ? meta : null;
  } catch (error) {
    return null;
  }
}