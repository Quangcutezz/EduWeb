import FragmentBlogItem from '../../../components/FragmentBlogItem';
import {
   fragmentBlogItemLabel,
   FragmentBlogItemType,
   TypeItemPost,
} from '../../../components/FragmentBlogItem/FragmentBlogItem.type';
import { Button, ButtonGroup } from '@nextui-org/react';
import uuid from 'react-uuid';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { IoArrowUndo, IoArrowRedo } from 'react-icons/io5';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
type EditorProps = {
   onResult: (result: TypeItemPost[]) => void;
};
function Editor(props: EditorProps) {
   const [items, setItems] = useState<TypeItemPost[]>([]);
   const [itemsNextVersion, setItemNextVersion] = useState<TypeItemPost[][]>([]);
   const [itemsPrevVersion, setItemPrevVersion] = useState<TypeItemPost[][]>([]);

   const handleUndo = () => {
      if (itemsPrevVersion.length === 0) {
         return;
      }
      const undoItems = itemsPrevVersion.pop();
      if (!undoItems) return;
      setItemNextVersion((prevVer) => [...prevVer, items]);
      setItems([...undoItems.map((i) => ({ ...i }))]);
   };
   const handleRedo = () => {
      if (itemsNextVersion.length === 0) {
         return;
      }
      const undoItems = itemsNextVersion.pop();
      if (!undoItems) return;
      setItemPrevVersion((prevVer) => [...prevVer, items]);
      setItems([...undoItems.map((i) => ({ ...i }))]);
   };

   function handleOnDragEnd(result: any) {
      if (!result.destination) return;
      const indexDes = result.destination.index;
      const indexSource = result.source.index;
      const newItems = Array.from(items);
      const [reorderedItem] = newItems.splice(indexSource, 1);
      newItems.splice(indexDes, 0, reorderedItem);
      const clonedItems = newItems.map((item: TypeItemPost, index) => ({ ...item, index }));
      setItems(clonedItems);
   }

   useEffect(() => {
      props.onResult(items);
   }, [items]);
   return (
      <div className="w-full p-4 mb-10 flex flex-col gap-10">
         <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="post-item" direction="vertical">
               {(provided) => (
                  <ul className="characters flex-col flex " {...provided.droppableProps} ref={provided.innerRef}>
                     {items.map((item: TypeItemPost, index) => (
                        <Draggable key={item.id} draggableId={item?.id?.toString() ?? ''} index={index}>
                           {(provided) => (
                              <div
                                 ref={provided.innerRef}
                                 {...provided.draggableProps}
                                 {...provided.dragHandleProps}
                                 className="mb-6"
                              >
                                 <FragmentBlogItem
                                    key={item.id}
                                    type={item.type}
                                    data={item}
                                    onChangeData={(data: {
                                       content?: string;
                                       link?: string;
                                       alt?: string;
                                       imgURL?: string;
                                       type?: FragmentBlogItemType;
                                    }) => {
                                       setItems((prev) =>
                                          prev.map((prevIt) =>
                                             prevIt.id === item.id ? { ...prevIt, ...data } : prevIt,
                                          ),
                                       );
                                    }}
                                    onRemove={(id) => {
                                       setItemPrevVersion((prevUndo) => [...prevUndo, items]);
                                       setItems((prev) => prev.filter((it) => it.id !== id));
                                    }}
                                 />
                              </div>
                           )}
                        </Draggable>
                     ))}
                     {provided.placeholder}
                  </ul>
               )}
            </Droppable>
         </DragDropContext>

         <div className="flex justify-start items-start gap-10">
            <span className="w-max flex-shrink-0">Thêm thành phần khác⚠️:</span>
            <div className="flex flex-wrap  gap-2 justify-start items-center">
               {fragmentBlogItemLabel.map((label) => (
                  <div key={label.key} className="relative group">
                     <Button
                        startContent={label.icon}
                        variant="flat"
                        onClick={() => {
                           setItems((prev) => {
                              setItemPrevVersion((prevVer) => [...prevVer, prev]);
                              return [
                                 ...prev,
                                 {
                                    id: uuid(),
                                    index: prev.length,
                                    type: label.key,
                                    content: '',
                                    alt: '',
                                    imgURL: '',
                                    link: '',
                                 },
                              ];
                           });
                        }}
                     />
                     <div className="hidden group-hover:block z-50 w-max absolute top-[100%] left-0 p-2 pl-4 pr-4 rounded-lg bg-[#e4e4e7] dark:bg-[#3f3f46]">
                        {label.label}
                     </div>
                  </div>
               ))}
               <div className="w-full flex justify-start items-center gap-4">
                  <ButtonGroup>
                     <Button variant="flat" onClick={handleUndo} isDisabled={itemsPrevVersion.length === 0}>
                        <IoArrowUndo className="text-xl cursor-pointer hover:text-blue-700" />
                     </Button>
                     <Button variant="flat" onClick={handleRedo} isDisabled={itemsNextVersion.length === 0}>
                        <IoArrowRedo className="text-xl cursor-pointer hover:text-blue-700" />
                     </Button>
                  </ButtonGroup>
               </div>
            </div>
         </div>

         {/* <ReactQuill className="rounded-lg h-[10rem]" theme="snow" value={value} onChange={setValue} /> */}
      </div>
   );
}

export default Editor;
