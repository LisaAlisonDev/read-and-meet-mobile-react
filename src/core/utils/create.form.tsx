 
export function createFormData (photo,  body)  {
    const formData : FormData = new FormData();
    formData.append("image", {uri: photo.uri, name: photo.fileName, type: photo.type} )
  
    Object.keys(body).forEach(key => {
      formData.append('image', body["image"]);
    });

    return formData;
  };