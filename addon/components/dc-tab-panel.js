import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'dc-tab-panel',

  attributeBindings: [
    'role',
    'aria-labeledby'
  ],

  // TODO: remove this, toggleVisibility won't fire w/o it though (?)
  classNameBindings: ['active'],

  /**
   * See http://www.w3.org/TR/wai-aria/roles#tabpanel
   *
   * @property role
   * @type String
   * @private
   */

  role: 'tabpanel',

  /**
   * Reference to the TabListComponent instance, used so we can find the
   * associated tab.
   *
   * @property tabList
   * @type TabListComponent
   * @private
   */

  tabList: Ember.computed.alias('parentView.tabList'),

  /**
   * Reference to the ArrayProxy of TabPanelComponent instances.
   *
   * @property tabPanels
   * @type ArrayProxy
   * @private
   */

  tabPanels: Ember.computed.alias('parentView.tabPanels'),

  /**
   * Tells screenreaders which tab labels this panel.
   *
   * @property 'aria-labeledby'
   * @type String
   * @private
   */

  'aria-labeledby': Ember.computed.alias('tab.elementId'),

  /*
   * Reference to this panel's associated tab.
   *
   * @property tab
   * @type TabComponent
   */

  tab: Ember.computed('tabList.tabs.@each', 'tabPanels.@each', function() {
    var index = this.get('tabPanels').indexOf(this);
    var tabs = this.get('tabList.tabs');
    return tabs && tabs.objectAt(index);
  }),

  /**
   * Tells whether or not this panel is active.
   *
   * @property active
   * @type Boolean
   */

  active: Ember.computed('tab.active', function() {
    return this.get('tab.active');
  }),

  /**
   * Shows or hides this panel depending on whether or not its active.
   *
   * @method toggleVisibility
   * @private
   */

  toggleVisibility: Ember.observer('active', function() {
    var display = this.get('active') ? '' : 'none';
    this.$().css('display', display);
  }),

  /**
   * Registers with the TabsComponent.
   *
   * @method registerWithTabs
   * @private
   */

  registerWithTabs: Ember.on('willInsertElement', function() {
    this.get('parentView').registerTabPanel(this);
  }),

  unregisterWithTabs: Ember.on('willDestroyElement', function() {
    this.get('parentView').unregisterTabPanel(this);
  })

});
