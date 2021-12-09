import React, { useState, useEffect, useRef } from 'react';

import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import Select from 'components/base/Select';
import { PlaceholderProfile } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Modal from 'components/layout/Modal';
import { BREAKPOINTS } from 'consts/breakpoints';
import pathOr from 'ramda/es/pathOr';
import { useMediaQuery } from 'react-responsive';
//@ts-ignore
import template from 'res/docs/bulkUpload.xlsx';

import { AccountOption, ChooseAccountProps } from './ChooseAccount.props';
import {
  Container,
  Image,
  ButtonImport,
  PlaceholderImage,
} from './ChooseAccount.style';

const AccountsView = (props: AccountOption) => {
  const image = props.image;
  return (
    <>
      {image ? (
        <Image src={image} />
      ) : (
        <PlaceholderImage>
          <PlaceholderProfile />
        </PlaceholderImage>
      )}
      <Typography variant="body" color="noshade">
        {props.label}
      </Typography>
    </>
  );
};

const ChooseAccount = ({
  onSelectAccount,
  accountOptions,
  onUploadCSV,
  isUploadingCSV,
  userPending,
}: ChooseAccountProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const aRef = useRef<HTMLAnchorElement>(null);

  const [selected, setSelected] = useState('');
  const [isAddInBulk, setIsAddInBulk] = useState(false);
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  useEffect(() => {
    if (selected === '') {
      setSelected(pathOr('', ['0', 'value'], accountOptions));
    }
    // eslint-disable-next-line
  }, [accountOptions]);

  return (
    <Container>
      {!isMobile && (
        <div className="title-container">
          <Typography variant="overline" color="shade6" className="title-text">
            Select Account
          </Typography>
          <ButtonImport
            variant={userPending ? 'disabled' : undefined}
            disabled={userPending}
            text="Bulk import"
            onClick={() => setIsAddInBulk(true)}
          />
        </div>
      )}

      {isMobile ? (
        <Select
          value={selected}
          onChange={(option) => {
            setSelected(option.value);
          }}
          options={accountOptions}
          label="Choose Account"
        />
      ) : (
        <>
          {accountOptions.map((option) => {
            return (
              <Interactions
                key={option.value}
                onClick={() => {
                  onSelectAccount(selected);
                }}
              >
                <AccountsView {...option} />
              </Interactions>
            );
          })}
        </>
      )}

      <div className="btn-container">
        {isMobile && (
          <Button
            variant={userPending ? 'disabled' : undefined}
            disabled={userPending}
            text="Add a new product"
            onClick={() => {
              onSelectAccount(selected);
            }}
          />
        )}
      </div>

      <Modal
        isOpen={isAddInBulk}
        onClickClose={() => setIsAddInBulk(false)}
        style={{
          padding: 48,
          width: 522,
        }}
      >
        <div>
          <Typography variant="title4" weight="bold" color="noshade">
            Bulk Spreadsheet Upload
          </Typography>
          <Typography color="shade6" className="blk-sub">
            If you have many items to list, you can upload a spreadsheet to add
            many quickly.
          </Typography>

          <Typography variant="overline" color="shade6">
            Step 1
          </Typography>
          <Typography variant="title6" color="shade2">
            Download template files
          </Typography>
          <Typography variant="label" color="shade6" className="blk-sub2">
            You can use Microsoft Excel or the free Google Sheets to complete
          </Typography>

          <Typography
            className="template-btn"
            variant="overline"
            color="noshade"
            onClick={() => {
              if (aRef.current !== null) {
                aRef.current.click();
              }
            }}
          >
            <a
              ref={aRef}
              href={template}
              download="bulkUpload.xlsx"
              onClick={(e) => e.stopPropagation()}
            >
              DOWNLOAD TEMPLATE
            </a>
          </Typography>

          <Typography variant="overline" color="shade6">
            Step 2
          </Typography>
          <Typography variant="title6" color="shade2">
            Upload your completed spreadsheet
          </Typography>
          <Typography variant="label" color="shade6" className="blk-sub2">
            Edit and save the spreadsheet in .csv format
          </Typography>
          <input
            id="csvUpload"
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={(e) => {
              if (e.currentTarget.files) {
                onUploadCSV(e.currentTarget.files[0]);
              }
            }}
          />

          <Button
            text="Upload csv file"
            loading={isUploadingCSV}
            onClick={() => {
              if (inputRef.current) inputRef.current.click();
            }}
          />
        </div>
      </Modal>
    </Container>
  );
};

export default ChooseAccount;
