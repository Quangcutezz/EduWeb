import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../../../layouts/AdminLayout';
import CreatePost from '../../../post/create';

function AddPost() {
   return (
      <AdminLayout>
         <Helmet>
            <title>Thêm bài viết mới trong hệ thống</title>
         </Helmet>
         <div className="bg-light-sidebar dark:bg-dark-sidebar rounded-xl mt-5">
            <CreatePost />
         </div>
      </AdminLayout>
   );
}

export default AddPost;
