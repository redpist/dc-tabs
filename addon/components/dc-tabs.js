import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'dc-tabs',

  /**
   * The selected TabComponent instance.
   *
   * @property activeTab
   * @type TabComponent
   */

  activeTab: null,

  /**
   * The TabPanelComponent instances.
   *
   * @property tabPanels
   * @type ArrayProxy
   */

  tabPanels: null,

  /**
   * Set this to the tab you'd like to be active. Usually it is bound to a
   * controller property that is used as a query parameter, but can be bound to
   * anything.
   *
   * @property 'selected-index'
   * @type Number
   */

  'selected-index': 0,

  /**
   * Creates the `tabPanels` ArrayProxy.
   *
   * @method createTabPanels
   * @private
   */

  createTabPanelArray: Ember.on('init', function(tabList) {
    this.set('tabPanels', Ember.ArrayProxy.create({content: []}));
  }),

  /**
   * Selects a tab.
   *
   * @method select
   */

  select: function(tab) {
    var tabIndex = tab.get('custom-index') || tab.get('index');
    this.set('activeTab', tab);
    this.set('selected-index', tabIndex);
  },

  /**
   * Registers the TabListComponent instance.
   *
   * @method registerTabList
   * @private
   */

  registerTabList: function(tabList) {
    this.set('tabList', tabList);
  },

  /**
   * Registers TabPanelComponent instances so related components can access
   * them.
   *
   * @method registerTabPanel
   * @private
   */

  registerTabPanel: function(tabPanel) {
    this.get('tabPanels').addObject(tabPanel);
  },

  unregisterTabPanel: function(tabPanel) {
    this.get('tabPanels').removeObject(tabPanel);
  }

});
