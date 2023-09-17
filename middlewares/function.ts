// this function is used to get the id from the jwt being parsed, so as to take the id from the payload as use it wherever it is needed.

export function parseJWT(jwt: string) {
    const parts = jwt.split('.');
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }
  
    const [headerBase64, payloadBase64, signatureBase64] = parts;
    
    const header = JSON.parse(atob(headerBase64));
    const payload = JSON.parse(atob(payloadBase64));
    
    return {
      header,
      payload
    };
  }
