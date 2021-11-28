
import { React } from 'react';

export default function DownBar() {
  return (
    <div className='lp-footer footer'>
      <div style={{margin: 'auto'}}>
        HR-Eco © {(new Date()).getFullYear()}
      </div>
    </div>
  )
}