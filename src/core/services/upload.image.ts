import { Profile } from "../@types/profile";
import { createFormData } from "../utils/create.form";

export const uploadProfileImageToServer = async (uri, type, name, authAxios, profileContext, navigation) =>{
    let profile = profileContext.getProfile()
    
        try {   
            const response = await authAxios.post('/upload/image/' + profile.id,
                createFormData({ uri: uri, type: type, fileName: name }, {}),{ headers: { 'Content-Type': 'multipart/form-data;' }, }
            );

            if (response.status == 200) {
                const profileResponse = await authAxios.put('/profile/' + profile.id, {
                    user_id: profile.user_id,
                    avatar: response.data.file,
                    description: profile.description,
                    favourite_book: '',
                    visibility: profile.visibility
                })

                if (profileResponse.status == 200) {
                    let data: Profile = profileResponse.data.data;
                
                    profileContext.saveProfile(data[0]);      

                    alert("Votre profil mise à jour avec succès !");
                    
                    navigation.navigate('Profile')
                }
            }
        } catch (err) {
            console.log(err);
            alert("Une erreur est survenue lors de la mise à jour de votre profil");
        }
    
}