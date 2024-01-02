const AddBlogModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <>
        <div 
          className="fixed inset-0 flex items-center justify-center z-50" 
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)'
          }}
        ></div>
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-screen-lg max-h-screen-3/4 overflow-y-auto">
            {children}
          </div>
        </div>
      </>
    );
  };
  
  export default AddBlogModal;
  