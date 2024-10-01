import { BreadcrumbItem, Breadcrumbs, Image, Link } from '@nextui-org/react';
import PostUserItem from './PostUserItem';
import { path } from '../../../enum/path';
import { useNavigate } from 'react-router-dom';
import { IPostItem } from '../../../model/Post.model';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { Helmet } from 'react-helmet-async';

const getAllPostByUserId = async (userId: number): Promise<IPostItem[] | null> => {
   try {
      const response = await fetch('https://localhost:7005/api/post/user/' + userId, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      });
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData: IPostItem[] = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return null;
   }
};

function UserManagerPost() {
   const history = useNavigate();
   const [posts, setPosts] = useState<IPostItem[]>([]);
   const { user } = useAuth();

   const handleRemovePost = (id: any) => {
      setPosts((prev) => prev.filter((i) => i.id !== id));
   };

   useEffect(() => {
      const getData = async () => {
         if (user) {
            const data = await getAllPostByUserId(user.id ?? 0);
            if (data) {
               setPosts(data);
               console.log(data);
            }
         }
      };

      getData();
   }, [user]);

   return (
      <div className="w-full h-full p-10">
         <Helmet>
            <title>Quản lý bài viết của bạn</title>
         </Helmet>
         <Breadcrumbs className="mt-5">
            <BreadcrumbItem
               onClick={() => {
                  history(path.HOME);
               }}
            >
               Trang chủ
            </BreadcrumbItem>
            <BreadcrumbItem>Người dùng</BreadcrumbItem>
            <BreadcrumbItem>Tất cả bài viết đã đăng</BreadcrumbItem>
         </Breadcrumbs>

         {/* <h1 className="mt-5 mb-5 text-2xl font-semibold">Tất cả bài viết đã đăng</h1> */}
         <div className="flex justify-start items-center flex-wrap w-full mt-5">
            {posts.map((post, i) => (
               <PostUserItem key={i} data={post} onRemove={handleRemovePost} />
            ))}
         </div>

         {posts.length === 0 && (
            <div className=" flex flex-col justify-center items-center w-full h-full">
               <Image
                  width={300}
                  height={300}
                  src="https://firebasestorage.googleapis.com/v0/b/appmapdemo-b2a39.appspot.com/o/9170826-removebg-preview.png?alt=media&token=cba62426-8920-4aa8-8f2e-e81ab2dd307c"
               />

               <h1>Bạn chưa đăng bài viết nào?</h1>

               <Link href={'/' + path.POST.CREATE}>Tạo ngay</Link>
            </div>
         )}
      </div>
   );
}

export default UserManagerPost;
