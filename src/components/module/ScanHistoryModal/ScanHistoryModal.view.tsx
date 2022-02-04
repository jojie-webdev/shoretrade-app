import React from 'react';

import Typography from 'components/base/Typography';
import moment from 'moment';
import { useTheme } from 'utils/Theme';

import DialogModal from '../DialogModal';
import { ScanHistoryModalProps } from './ScanHistoryModal.props';

const ScanHistoryModal = (props: ScanHistoryModalProps): JSX.Element => {
  const theme = useTheme();
  if (!props.scanHistoryItems || props?.scanHistoryItems.length < 1) {
    return <></>;
  }
  const { scanHistoryItems } = props;
  return (
    <DialogModal
      onClickClose={() => props.onClickClose()}
      title="Scan History"
      isOpen={props.isOpen}
    >
      <div>
        {scanHistoryItems.map((sh, index) => (
          <div style={{ display: 'flex' }} key={sh.id}>
            <div
              style={{
                marginBottom: 6,
                paddingBottom: '6px',
                borderBottom:
                  index < scanHistoryItems?.length - 1
                    ? `1px solid ${theme.grey.shade7}`
                    : 0,
              }}
            >
              <Typography variant="caption" color="shade3">
                {`Scanned by ${sh.user_first_name} ${sh.user_last_name} (${sh.user_role})`}
              </Typography>
              <Typography variant="caption" color="shade3">
                {`${moment(sh.updated_at).format(
                  'DD MMM YYYY hh:MMa'
                )} at Sydney Fish Market`}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </DialogModal>
  );
};

export default React.memo(ScanHistoryModal);
