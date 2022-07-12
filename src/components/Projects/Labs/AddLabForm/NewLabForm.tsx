import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { CustomInputText, FirstFloatingLabelContainer, FloatingLabelContainer } from './styles';
import { useLabsStore } from '@app/stores/labsStore';
import { Chips } from 'primereact/chips';
import { useParams } from 'react-router-dom';

const Child = forwardRef((props, ref) => {
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [products, setProducts] = useState([]);
  const [patents, setPatents] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [manager, setManager] = useState('');
  const { projectId } = useParams();
  const addLab = useLabsStore((state: any) => state.addLab);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addLab(
        title,
        link,
        products,
        patents,
        equipment,
        instruments,
        email,
        phoneNumber,
        manager,
        projectId,
      );
    },
  }));

  return (
    <div>
      <FirstFloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="title"
          // @ts-ignore
          value={title}
          // @ts-ignore
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="title">Title</label>
      </FirstFloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="link"
          // @ts-ignore
          value={link}
          // @ts-ignore
          onChange={(e) => setLink(e.target.value)}
        />
        <label htmlFor="link">Link</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <Chips
          id="products"
          value={products}
          style={{ width: '98%' }}
          onChange={(e) => {
            // @ts-ignore
            setProducts(e.target.value);
          }}></Chips>
        <label htmlFor="products">Products</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <Chips
          id="patents"
          value={patents}
          style={{ width: '98%' }}
          onChange={(e) => {
            // @ts-ignore
            setPatents(e.target.value);
          }}></Chips>
        <label htmlFor="patents">Patents</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <Chips
          id="equipment"
          value={equipment}
          style={{ width: '98%' }}
          onChange={(e) => {
            // @ts-ignore
            setEquipment(e.target.value);
          }}></Chips>
        <label htmlFor="equipment">Equipment</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <Chips
          id="instruments"
          value={instruments}
          style={{ width: '98%' }}
          onChange={(e) => {
            // @ts-ignore
            setInstruments(e.target.value);
          }}></Chips>
        <label htmlFor="instruments">Instruments</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '98%' }}
          id="manager"
          value={manager}
          onChange={(e) => {
            // @ts-ignore
            setManager(e.target.value);
          }}
        />
        <label htmlFor="manager">Manager</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '98%' }}
          id="email"
          value={email}
          onChange={(e) => {
            // @ts-ignore
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="email">Email</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '98%' }}
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => {
            // @ts-ignore
            setPhoneNumber(e.target.value);
          }}
        />
        <label htmlFor="phoneNumber">Phone Number</label>
      </FloatingLabelContainer>
    </div>
  );
});

export default Child;
