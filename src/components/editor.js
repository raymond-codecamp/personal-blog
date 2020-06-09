import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor';
import CKEditor from '@ckeditor/ckeditor5-react';

function RichTextEditor(props)
{
    const {value, onChange, onBlur, onFocus} = props;
    return(
    <>
        <CKEditor
            editor={ ClassicEditor }
            data={value}
            onInit={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log( 'Editor is ready to use!', editor );
            } }
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
        />
    </>
    );

}
export default RichTextEditor;