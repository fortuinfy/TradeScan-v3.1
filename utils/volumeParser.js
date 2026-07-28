// ========================= 
// VOLUME PARSER 
// ========================= 
function parseVolume(volumeInput) { 
    if ( volumeInput === undefined || volumeInput === null ) { 
        return 0; 
    } 
    
    const value = volumeInput.toString().trim().toUpperCase().replace(/\s+/g, ""); 
    
    if (value === "") { 
        return 0; 
    } 
    
    // ========================= 
    // TRILLION 
    // ========================= 
    if (value.includes("T")) { 
        return ( parseFloat( value.replace("T", "") ) * 1000000000000 ); 
    }
    // ========================= 
    // BILLION 
    // ========================= 
    if (value.includes("B")) { 
        return ( parseFloat( value.replace("B", "") ) * 1000000000 ); 
    }
    // ========================= 
    // CRORE 
    // ========================= 
    if (value.includes("CR")) { 
        return ( parseFloat( value.replace("CR", "") ) * 10000000 ); 
    } 
    // ========================= 
    // MILLION 
    // ========================= 
    if (value.includes("M")) { 
        return ( parseFloat( value.replace("M", "") ) * 1000000 ); 
    } 
    // ========================= 
    // LAKH 
    // ========================= 
    if (value.includes("L")) { 
        return ( parseFloat( value.replace("L", "") ) * 100000 ); 
    } 
    // ========================= 
    // THOUSAND 
    // ========================= 
    if (value.includes("K")) { 
        return ( parseFloat( value.replace("K", "") ) * 1000 ); 
    } 
    
    // If the dropdown was left empty, it returns the raw number (e.g., 500)
    return parseFloat(value) || 0; 
}
