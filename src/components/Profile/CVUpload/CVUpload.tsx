import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';

import { FileUploadIconSmall, Container, ColoredButton, UploadContainer } from './styles';

export default function CVUpload({ url, onUpload }: any) {
  const [cvUrl, setCVUrl] = useState<string>();
  const [uploading, setUploading] = useState(false);
  const [showUploadButton, setShowUploadButton] = useState(false);

  useEffect(() => {
    if (url) {
      downloadCV();
      setShowUploadButton(false);
    } else {
      setShowUploadButton(true);
    }
  }, [url]);

  async function downloadCV() {
    try {
      const { signedURL, error } = await supabase.storage.from('cvs').createSignedUrl(url, 60);
      if (signedURL) {
        setCVUrl(signedURL);
      }
    } catch (error: any) {
      console.log('Error downloading cv: ', error.message);
    }
  }

  async function uploadCV(event: any) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select a file to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage.from('cvs').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
      setShowUploadButton(false);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
      setShowUploadButton(false);
    }
  }

  const openCV = async () => {
    const { signedURL, error } = await supabase.storage.from('cvs').createSignedUrl(url, 60);
    if (signedURL) {
      setCVUrl(signedURL);
      window.open(signedURL, '_blank');
    }
  };

  return (
    <Container>
      {cvUrl && (
        <div>
          <ColoredButton onClick={() => openCV()}>View CV</ColoredButton>
        </div>
      )}
      {showUploadButton && (
        <div>
          <label htmlFor="cvUpload">
            <div>
              Upload CV <FileUploadIconSmall className="pi pi-upload" />
            </div>
          </label>
          <input
            style={{
              visibility: 'hidden',
              position: 'absolute',
            }}
            type="file"
            id="cvUpload"
            accept=".doc,.docx,.pdf,.png,.jpg,.jpeg"
            onChange={uploadCV}
            disabled={uploading}
          />
        </div>
      )}
      {!showUploadButton && (
        <div>
          <label htmlFor="cv">
            <UploadContainer>
              <FileUploadIconSmall className="pi pi-upload" />
              {uploading && (
                <i
                  className="pi pi-spin pi-spinner"
                  style={{ fontSize: '2em', marginLeft: '0.5em' }}
                ></i>
              )}
            </UploadContainer>
          </label>
          <input
            style={{
              visibility: 'hidden',
              position: 'absolute',
            }}
            type="file"
            id="cv"
            accept=".doc,.docx,.pdf,.png,.jpg,.jpeg"
            onChange={uploadCV}
            disabled={uploading}
          />
        </div>
      )}
    </Container>
  );
}
