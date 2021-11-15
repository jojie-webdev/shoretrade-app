import React, { useState, useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import { RateSellerModalProps } from './RateSellerModal.props';
import Modal from 'components/layout/Modal';
import Typography from 'components/base/Typography';
import StarRating from 'components/base/StarRating';
import TextArea from 'components/base/TextArea';
import Button from 'components/base/Button';

import { useTheme } from 'utils/Theme';

const RateSellerModal = (props: RateSellerModalProps): JSX.Element => {
  const theme = useTheme();
  const { ...modalProps } = props
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    if (!props.isOpen) {
      setRating(0)
      setFeedback("")
    }
  }, [props.isOpen])
  
  return (
    <Modal {...modalProps} style={{ borderRadius: '12px', width: '686px' }}>
      <Typography variant="title4" style={{ fontFamily: 'Media Sans' }}>
        Rate Seller
      </Typography>
      <Typography variant="overline" color="shade6" style={{ fontFamily: 'Basis Grotesque Pro', marginTop: '20px' }}>
        Rate the quality of the products you received out of 5 stars
      </Typography>
      <StarRating
        editable={true}
        rating={rating} 
        onChange={(rating) => setRating(rating)} 
        starSize={23}
        spacing={6}
        style={{ marginTop: '8px' }}
      />
      <Typography variant="overline" color="shade6" style={{ fontFamily: 'Basis Grotesque Pro', marginTop: '20px' }}>
        Private Feedback*
      </Typography>
      <TextArea
        value={feedback}
        onChangeText={setFeedback}
        placeholder="Write a Private Feedback only for Administrators..."
        height={120}
        style={{ borderRadius: '12px', border: `1px solid ${theme.grey.shade6}`, fontWeight: 'lighter' }}
      />
      <Typography variant="label" color="shade7" style={{ fontFamily: 'Basis Grotesque Pro' }}>
        *The private feedback will be sent only to ShoreTrade Administrators for review purposes.
      </Typography>
      <Button
        loading={props.loading}
        disabled={!rating}
        variant="primary"
        textVariant="overline"
        text="Send Feedback"
        size="md"
        textWeight="900"
        style={{ borderRadius: '12px', marginTop: '20px' }}
        onClick={() => props.sendReview(rating, feedback)}
      />
    </Modal>
  );
};

export default React.memo(RateSellerModal);
