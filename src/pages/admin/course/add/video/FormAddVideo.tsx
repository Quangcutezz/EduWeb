import { Button, Input, Tab, Tabs } from '@nextui-org/react';
import { IoIosSave } from 'react-icons/io';
import { FaYoutube } from 'react-icons/fa';
import { RiVideoUploadFill } from 'react-icons/ri';
import { IoMdLink } from 'react-icons/io';
import { useState } from 'react';
import YouTubeEmbed from '../../../../../components/YouTubeEmbed';
import helper from '../../../../../helper';
import UploadVideo from '../../../../../components/UploadVideo';
import { IVideoLesson } from '../../../../../model/Course.model';
import uuid from 'react-uuid';

type FormAddVideoProps = {
   onResult: (res: IVideoLesson) => void;
};
function FormAddVideo(props: FormAddVideoProps) {
   const [videoId, setVideoId] = useState('');
   const [videoURL, setVideoURL] = useState('');
   return (
      <div className="pb-40">
         <Tabs aria-label="Options" variant="bordered">
            <Tab
               key="embedYoutube"
               title={
                  <div className="flex items-center space-x-2">
                     <FaYoutube />
                     <span>Nhúng video youtube</span>
                  </div>
               }
            >
               <Input
                  startContent={<IoMdLink />}
                  className="p-4"
                  value={videoId}
                  onChange={(e) => setVideoId(e.target.value)}
                  label="Nhập link video youtube..."
                  labelPlacement="outside"
                  placeholder="ex: https://www.youtube.com/embed/5z5_fMQn4Tc?si=2t1t2RIvXFasBSfE"
               />

               <h1 className="p-4">Xem trước</h1>

               {videoId && <YouTubeEmbed videoId={helper.getVideoYTId(videoId)} />}
            </Tab>
            <Tab
               key="uploadVideo"
               title={
                  <div className="flex items-center space-x-2">
                     <RiVideoUploadFill />
                     <span>Tải lên video</span>
                  </div>
               }
            >
               <div className="p-4">
                  <UploadVideo
                     color="primary"
                     onResult={function (res: string): void {
                        setVideoURL(res);
                     }}
                     label="Tải lên vieo"
                  />
                  <h1 className="p-4">Xem trước</h1>

                  {videoURL && (
                     <video
                        style={{
                           height: '30rem',
                           borderRadius: '10px',
                        }}
                        controls
                        className="w-full"
                     >
                        <source src={videoURL} type="video/mp4" />
                        Your browser does not support the video tag.
                     </video>
                  )}
               </div>
            </Tab>
         </Tabs>
         <div className="flex justify-center gap-4 mt-10 items-center right-1/2 z-50 translate-x-1/2 mb-20 fixed -bottom-16 shadow-2xl">
            <Button
               onClick={() => {
                  props.onResult({
                     videoId: helper.getVideoYTId(videoId),
                     videoURL,
                     id: uuid(),
                  });
               }}
               startContent={<IoIosSave />}
               color="success"
               className="text-white"
            >
               Lưu lại
            </Button>
         </div>
      </div>
   );
}

export default FormAddVideo;
