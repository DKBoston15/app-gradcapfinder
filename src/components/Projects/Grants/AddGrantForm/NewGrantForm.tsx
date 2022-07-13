import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
  DateInput,
  CustomCalendar,
} from './styles';
import { useGrantStore } from '@app/stores/grantStore';
import { useParams } from 'react-router-dom';

const Child = forwardRef((props, ref) => {
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [grantingOrganization, setGrantingOrganization] = useState(null);
  const [number, setNumber] = useState(null);
  const [fundDate, setFundDate] = useState(null);
  const [amount, setAmount] = useState(null);
  const [reportingDate1, setReportingDate1] = useState(null);
  const [reportingDate2, setReportingDate2] = useState(null);
  const [reportingDate3, setReportingDate3] = useState(null);
  const [reportingDate4, setReportingDate4] = useState(null);
  const { projectId } = useParams();
  const addGrant = useGrantStore((state: any) => state.addGrant);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addGrant(
        title,
        link,
        grantingOrganization,
        number,
        fundDate,
        amount,
        reportingDate1,
        reportingDate2,
        reportingDate3,
        reportingDate4,
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
        <CustomInputText
          id="grantingOrganization"
          // @ts-ignore
          value={grantingOrganization}
          // @ts-ignore
          onChange={(e) => setGrantingOrganization(e.target.value)}
        />
        <label htmlFor="grantingOrganization">Granting Organization</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="grantNumber"
          // @ts-ignore
          value={number}
          // @ts-ignore
          onChange={(e) => setNumber(e.target.value)}
        />
        <label htmlFor="grantNumber">Grant Number</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="grantAmount"
          // @ts-ignore
          value={amount}
          // @ts-ignore
          onChange={(e) => setAmount(e.target.value)}
        />
        <label htmlFor="grantAmount">Grant Amount</label>
      </FloatingLabelContainer>
      <DateInput className="p-float-label">
        <CustomCalendar
          id="fundDate"
          value={fundDate}
          onChange={(e) => {
            setFundDate(e.value);
          }}
          showIcon
        />
        <label htmlFor="fundDate">Fund Date</label>
      </DateInput>
      <DateInput className="p-float-label">
        <CustomCalendar
          id="reportingDate1"
          value={reportingDate1}
          onChange={(e) => {
            setReportingDate1(e.value);
          }}
          showIcon
        />
        <label htmlFor="reportingDate1">1st Reporting Date</label>
      </DateInput>
      <DateInput className="p-float-label">
        <CustomCalendar
          id="reportingDate2"
          value={reportingDate2}
          onChange={(e) => {
            setReportingDate2(e.value);
          }}
          showIcon
        />
        <label htmlFor="reportingDate2">2nd Reporting Date</label>
      </DateInput>
      <DateInput className="p-float-label">
        <CustomCalendar
          id="reportingDate3"
          value={reportingDate3}
          onChange={(e) => {
            setReportingDate3(e.value);
          }}
          showIcon
        />
        <label htmlFor="reportingDate3">3rd Reporting Date</label>
      </DateInput>
      <DateInput className="p-float-label">
        <CustomCalendar
          id="reportingDate4"
          value={reportingDate4}
          onChange={(e) => {
            setReportingDate4(e.value);
          }}
          showIcon
        />
        <label htmlFor="reportingDate4">4th Reporting Date</label>
      </DateInput>
    </div>
  );
});

export default Child;
