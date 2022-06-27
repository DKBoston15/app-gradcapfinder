import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, DateInput, CustomCalendar, LinkContainer } from './styles';
import { useGrantStore } from '../../../../stores/grantStore';

export default function GrantInfo({ selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const patchGrant = useGrantStore((state: any) => state.patchGrant);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [grantingOrganization, setGrantingOrganization] = useState(null);
  const [number, setNumber] = useState(null);
  const [fundDate, setFundDate] = useState(null);
  const [amount, setAmount] = useState(null);
  const [reportingDate1, setReportingDate1] = useState(null);
  const [reportingDate2, setReportingDate2] = useState(null);
  const [reportingDate3, setReportingDate3] = useState(null);
  const [reportingDate4, setReportingDate4] = useState(null);

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setLink(selectedItem.link);
      setGrantingOrganization(selectedItem.granting_organization);
      setNumber(selectedItem.number);
      setFundDate(selectedItem.fund_date);
      setAmount(selectedItem.amount);
      if (selectedItem.fund_date) {
        setFundDate(new Date(selectedItem.fund_date));
      }
      if (selectedItem.reporting_date_1) {
        setReportingDate1(new Date(selectedItem.reporting_date_1));
      }
      if (selectedItem.reporting_date_2) {
        setReportingDate2(new Date(selectedItem.reporting_date_2));
      }
      if (selectedItem.reporting_date_3) {
        setReportingDate3(new Date(selectedItem.reporting_date_3));
      }
      if (selectedItem.reporting_date_4) {
        setReportingDate4(new Date(selectedItem.reporting_date_4));
      }
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    setSaving(true);
    await patchGrant(
      selectedItem.id,
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
              <InputText
                style={{ width: '100%' }}
                id="grantingOrganization"
                // @ts-ignore
                value={grantingOrganization || ''}
                // @ts-ignore
                onChange={(e) => setGrantingOrganization(e.target.value)}
              />
              <label htmlFor="grantingOrganization">Granting Organization</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="grantNumber"
                value={number || ''}
                onChange={(e) => {
                  // @ts-ignore
                  setNumber(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="grantNumber">Grant Number</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputText
                id="grantAmount"
                style={{ width: '100%' }}
                // @ts-ignore
                value={amount || ''}
                // @ts-ignore
                onChange={(e) => setAmount(e.target.value)}
              />
              <label htmlFor="grantAmount">Grant Amount</label>
            </CustomInput>
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
        </div>
      )}
    </>
  );
}
