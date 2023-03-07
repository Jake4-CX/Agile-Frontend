import axios from "../axios";

export const ImageService = () => {

  const uploadImageRequest = (data: FormData, image_group_id: number) => {

    return axios.post('/images/upload/' + image_group_id, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  const getImagesByImageGroupRequest = (image_group_id: number) => {
    return axios.get(`/images/${image_group_id}`);
  }

  return {uploadImageRequest, getImagesByImageGroupRequest}
}