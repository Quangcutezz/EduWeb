import { ILesson } from '../../model/Course.model';

type VideoLearningProps = {
   data: ILesson;
};
function VideoLearning(props: VideoLearningProps) {
   return (
      <div
         style={{
            height: 'calc(100vh - 10rem)',
         }}
         className="select-none scroll-custom overflow-auto w-full "
      >
         <div className="w-full bg-black  border-b-[1px] border-solid dark:border-gray-900 ">
            <div className="w-full max-w-5xl m-auto ">
               {props.data.video?.videoId && (
                  <iframe
                     allowFullScreen={true}
                     className="overflow-hidden max-h-[40rem]"
                     width="100%"
                     src={`https://www.youtube.com/embed/${props.data.video?.videoId}?si=hOxjPFulRacutQLR`}
                     title=""
                     allow=" autoplay; encrypted-media; picture-in-picture"
                  ></iframe>
               )}
               {props.data.video?.videoURL && (
                  <video
                     style={{
                        height: '30rem',
                        borderRadius: '10px',
                     }}
                     controls
                     className="w-full"
                  >
                     <source src={props.data.video?.videoURL} type="video/mp4" />
                  </video>
               )}
            </div>
         </div>

         <div className=" p-10 ">
            <h5 className="text-3xl font-extrabold">{props.data.title}</h5>
            <h5 className="text-lg text-white/50">Cập nhật vào ngày 12/04/2003</h5>

            <br />
            <div>
               {props.data.description}❤️
               <br />
            </div>
         </div>
      </div>
   );
}

export default VideoLearning;
