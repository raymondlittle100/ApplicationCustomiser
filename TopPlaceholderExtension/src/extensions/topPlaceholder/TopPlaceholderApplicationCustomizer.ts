import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'TopPlaceholderApplicationCustomizerStrings';
import styles from './TopPlaceholder.module.scss';
import {escape } from '@microsoft/sp-lodash-subset';
const LOG_SOURCE: string = 'TopPlaceholderApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ITopPlaceholderApplicationCustomizerProperties {
  // This is an example; replace with your own property
  top: string;  
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class TopPlaceholderApplicationCustomizer
  extends BaseApplicationCustomizer<ITopPlaceholderApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    this._renderPlaceHolders();

    return Promise.resolve();
  }

  private _renderPlaceHolders():void
  {
    console.log('placeholders ',
      this.context.placeholderProvider.placeholderNames.map(
        name => PlaceholderName[name]
    ));

    if(!this._topPlaceholder)
    {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top, 
      {
        onDispose: this._onDispose
      });
    }

    if(!this._topPlaceholder)
    {
      console.log("can't find top placeholder");
      return;
    }

    if(this._topPlaceholder.domElement)
    {
      this._topPlaceholder.domElement.innerHTML = `
        <div class="${styles.cp_steps}">
          <ol class="${styles.cp_steps__nav}">
            <li class="${styles.cp_steps__item} ${styles.current}">
              <a href="#overviewTab" onclick="" title="Initiation">
                <span>Initiation</span>
              </a>
            </li>
            <li class="${styles.cp_steps__item}">
              <a href="#configureBOMTab" onclick="" title="Scoping">
                <span>Scoping</span>
              </a>
            </li>
            <li class="${styles.cp_steps__item}">
              <a href="#confirmBOMTab" onclick="" title="Implementation">
                <span>Implementation</span>
              </a>
            </li>
            <li class="${styles.cp_steps__item}">
              <a href="#productionDetailsTab" onclick="" title="Production">
                <span>Production</span>
              </a>
            </li>
            <li class="${styles.cp_steps__item}">
            <a href="#productionDetailsTab" onclick="" title="Review">
              <span>Review</span>
            </a>
          </li>
            <li class="${styles.cp_steps__item}">
              <a href="#completeProdPropTab" onclick="" title="Complete">
                <span>Complete</span>
              </a>
            </li>
          </ol>
        </div>`
    }    
  }

  private _onDispose():void
  {
    console.log('dispose');
  }
}
