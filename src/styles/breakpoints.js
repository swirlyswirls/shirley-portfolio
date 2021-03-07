const size = {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xlg: '1200px',
   }
   
   const device = {
    sm: `(max-width: ${size.sm})`,
    md: `(max-width: ${size.md})`,
    lg: `(max-width: ${size.lg})`,
    xlg: `(max-width: ${size.xlg})`
   }
   
   export default {size, device}