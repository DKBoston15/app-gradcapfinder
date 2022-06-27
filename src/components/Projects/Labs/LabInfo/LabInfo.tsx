import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, LinkContainer } from './styles';
import { useLabsStore } from '../../../../stores/labsStore';
import { Chips } from 'primereact/chips';

export default function LabInfo({ selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const patchLab = useLabsStore((state: any) => state.patchLab);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [products, setProducts] = useState(['']);
  const [patents, setPatents] = useState(['']);
  const [equipment, setEquipment] = useState(['']);
  const [instruments, setInstruments] = useState(['']);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [manager, setManager] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setLink(selectedItem.link);
      setProducts(selectedItem.products);
      setPatents(selectedItem.patents);
      setEquipment(selectedItem.equipment);
      setInstruments(selectedItem.instruments);
      setEmail(selectedItem.email);
      setPhoneNumber(selectedItem.phone_number);
      setManager(selectedItem.manager);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    setSaving(true);
    await patchLab(
      selectedItem.id,
      title,
      link,
      products,
      patents,
      equipment,
      instruments,
      email,
      phoneNumber,
      manager,
    );
    setTimeout(() => {
      setSaving(false);
    }, 500);
  }, 1500);

  return (
    <>
      {selectedItem && !loading && (
        <div>
          <div>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="title"
                value={title || ''}
                onChange={(e) => {
                  // @ts-ignore
                  setTitle(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="title">Title</label>
            </CustomInput>
            <LinkContainer>
              <LinkInput className="p-float-label">
                <InputText
                  style={{ width: '100%' }}
                  id="link"
                  value={link || ''}
                  onChange={(e) => {
                    // @ts-ignore
                    setLink(e.target.value);
                    debouncedUpdate();
                  }}
                />
                <label htmlFor="link">Link</label>
              </LinkInput>
              <i
                className="pi pi-external-link"
                onClick={() => window.open(link, '_blank')}
                style={{
                  fontSize: '1.5em',
                  paddingBottom: '0.2em',
                  marginLeft: '1em',
                  cursor: 'pointer',
                }}
              />
            </LinkContainer>
            <CustomInput className="p-float-label">
              <Chips
                id="products"
                value={products}
                onChange={(e) => {
                  // @ts-ignore
                  setProducts(e.target.value);
                  debouncedUpdate();
                }}></Chips>
              <label htmlFor="products">Products</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <Chips
                id="patents"
                value={patents}
                onChange={(e) => {
                  // @ts-ignore
                  setPatents(e.target.value);
                  debouncedUpdate();
                }}></Chips>
              <label htmlFor="patents">Patents</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <Chips
                id="equipment"
                value={equipment}
                onChange={(e) => {
                  // @ts-ignore
                  setEquipment(e.target.value);
                  debouncedUpdate();
                }}></Chips>
              <label htmlFor="equipment">Equipment</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <Chips
                id="instruments"
                value={instruments}
                onChange={(e) => {
                  // @ts-ignore
                  setInstruments(e.target.value);
                  debouncedUpdate();
                }}></Chips>
              <label htmlFor="instruments">Instruments</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="manager"
                value={manager || ''}
                onChange={(e) => {
                  // @ts-ignore
                  setManager(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="manager">Manager</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="email"
                value={email || ''}
                onChange={(e) => {
                  // @ts-ignore
                  setEmail(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="email">Email</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="phoneNumber"
                value={phoneNumber || ''}
                onChange={(e) => {
                  // @ts-ignore
                  setPhoneNumber(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="phoneNumber">Phone Number</label>
            </CustomInput>
          </div>
        </div>
      )}
    </>
  );
}
