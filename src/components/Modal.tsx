type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
};
function Modal(props: ModalProps) {
    return (
        <div
            className={`fixed h-screen w-screen top-0 bottom-0 left-0 right-0 z-[1000000] backdrop-blur-2xl justify-center items-center bg-red-400 dark:bg-rgba(255,255,255,0.1) bg-rgba(0,0,0,0.1) ${
                props.isOpen ? 'flex' : 'hidden'
            }`}
        >
            <div className="rounded-lg dark:bg-[#3e3e45] bg-gray-300 p-4 min-w-[20rem]">{props.children}</div>
        </div>
    );
}

export default Modal;
