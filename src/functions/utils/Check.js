export function isObject(value) {
    return (
        typeof value === 'object' && value !== null && !Array.isArray(value)
    );
}

export function isUUID(value){
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i; 
    return uuidPattern.test(value);
}

export function isUUIDWithImageExtension(value) { 
    const uuidWithImagePattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|jpeg|png)$/i;
    return uuidWithImagePattern.test(value); 
}