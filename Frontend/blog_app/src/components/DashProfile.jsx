import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import {getDownloadURL,uploadBytesResumable, getStorage, ref}from'firebase/storage';
import {app} from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css' ;
import { updateStart,updateFailure,updateSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
 function DashProfile() {
  const {currentUser, error}=useSelector(state =>state.user)
  const [imageFile,setImageFile]=useState(null);
  const [imageFileUrl,setImageFileUrl]=useState(null);
  const [imageFileUploadProgress ,setImageFileUploadProgress]=useState(null);
  const[imageFileUploadError ,setImageFileUploadError]=useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const[fromData ,setFormData]=useState({});
  const [showModal, setShowModal] = useState(false);
  const filePickerRef=useRef();
  const dispatch =useDispatch();
  const handleImageChange =(e)=>{
    const file=e.target.files[0]
    setImageFile(file);
    if(file){
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
useEffect(()=>{
  if(imageFile){
    uploadImage();
  }
},[imageFile])
const uploadImage=async()=>{
  

  // service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read;
  //       allow write: if
  //       request.resource.size< 2 * 1024 * 1024 &&
  //       request.resource.contentType.matches('image/.*')
  //     }
  //   }
  // }
  setImageFileUploading(true);
  setImageFileUploadError(null);
const  storage =getStorage(app);
const fileName=new Date().getTime()+imageFile.name;
const storageRef=ref(storage,fileName);
const uploadTask =uploadBytesResumable(storageRef,imageFile);
uploadTask.on(
  'state_changed',
  (snapshot)=>{
    const progress=
    (snapshot.bytesTransferred/snapshot.totalBytes)*100;
  setImageFileUploadProgress(progress.toFixed(0));  
  },
  (error)=>{
    setImageFileUploadError('could not upload image(file must be less than 2 MB)');
    setImageFileUploadProgress(null);
    setImageFile(null);
    setImageFileUrl(null);
    setImageFileUploading(false);

  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
      setImageFileUrl(downloadURL);
      setFormData({...fromData,profilePicture:downloadURL});
      setImageFileUploading(false);
     

      });
    });
  }
  const handleChange =  (e)=>{
    setFormData({...fromData,[e.target.id]:e.target.value});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   setUpdateUserError(null);
   setUpdateUserSuccess(null);
  
    if (Object.keys(fromData).length === 0) {
      setUpdateUserError('no changes made')
      return;
    }
    if(imageFileUploading){
      setUpdateUserError('please wait for image  to upload')
      return;
    }
  
    try {
      dispatch(updateStart());
  
      const response = await axios.put(`/api/user/update/${currentUser._id}`, fromData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = response.data;
  
      if (response.status >= 200 && response.status < 300) {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("user profile updated successfully");
       
      } else {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);

      
      }
    } catch (error) {
   
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);

    }
  };
// delete user
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
  
      // Make the DELETE request using axios
      const response = await axios.delete(`/api/user/delete/${currentUser._id}`);
  
      // Destructure data from the response
      const data = response.data;
  
      if (response.status >= 200 && response.status < 300) {
        // Dispatch success action if status code indicates success
        dispatch(deleteUserSuccess(data));
      } else {
        // Dispatch failure action if status code indicates failure
        dispatch(deleteUserFailure(data.message));
      }
    } catch (error) {
      // Handle errors from the API request
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(deleteUserFailure(errorMessage));
    }
  
  }
// sign out
  const handleSignout = async () => {
    try {
      // Make the POST request using axios
      const response = await axios.post('/api/user/signout');
  
      // Destructure data from the response
      const data = response.data;
  
      if (response.status >= 200 && response.status < 300) {
        // Dispatch success action if the status code indicates success
        dispatch(signoutSuccess());
      } else {
        // Log error message if status code indicates failure
        console.log(data.message);
      }
    } catch (error) {
      // Handle errors from the API request
      console.log(error.response?.data?.message || error.message);
    }
  };
  
  



    return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className='my-7 text-canter font-semibold text-3xl'>Profile</h1>
      <form  onSubmit={ handleSubmit} className='flex flex-col gap-4'>
      <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
      
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>filePickerRef.current.click()}>
      {imageFileUploadProgress && (
        <CircularProgressbar value={imageFileUploadProgress||0}text={`${imageFileUploadProgress}%`}
        strokeWidth={5}
        styles={
          {
            root:{
              width:'100%',
              height:'100%',
              position:'absolute',
              top:0,
              left:0,

            },
            path:{
              stroke:`rgba(62,152,199,${imageFileUploadProgress/100})`,
            },
          }
        }/>
      )}
        <img src={imageFileUrl||currentUser.profilePicture} alt='user'
        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
          imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'
        }`}/>
        </div>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}onChange={handleChange}/>

        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}onChange={handleChange}/>

        <TextInput type='password' id='password' placeholder='password'onChange={handleChange}/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline >Update</Button>

      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>Delete Account</span>
      <span onClick={handleSignout} className='cursor-pointer'>Sign Out</span>

    </div>
    {updateUserSuccess&&(
      <Alert color='success' className='mt-5'>
        {updateUserSuccess}
      </Alert>
    )}
    {updateUserError&&(
      <Alert color='failure' className='mt-5'>
        {updateUserError}
      </Alert>
    )}
    {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
     <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
   </div>
  )
}

export default DashProfile