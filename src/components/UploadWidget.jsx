import React from "react";


const UploadWidget = React.forwardRef((props, ref) => {


      const handleFileSelect = (event) => {
            //    create a "fake URL" 
            const file = event.target.files[0];
            const tempURL = URL.createObjectURL(file);
            props.onFileSelect && props.onFileSelect(tempURL);
      };

      return (
            <React.Fragment>
                  <label className="UploadWidget label" htmlFor={props.name}>
                        {props.children}
                  </label>
                  <input
                        onChange={handleFileSelect}
                        ref={ref}
                        className="UploadWidget input"
                        id={props.name}
                        name={props.name}
                        type="file"
                  />
            </React.Fragment>
      );
});

export default UploadWidget;