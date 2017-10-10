import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';

import styles from './PopoutPanel.module.scss';

export interface IPopoutPanelProps {
  text: string;
}

const LOG_SOURCE: string = 'PopoutPanel';

export default class PopoutPanel extends React.Component<IPopoutPanelProps, {}> {
  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: PopoutPanel mounted');
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: PopoutPanel unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {
    return (
      <div className={styles.cell}>
        { this.props.text }
      </div>
    );
  }
}
