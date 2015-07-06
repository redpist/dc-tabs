import Ember from 'ember';

export default Ember.Component.extend({


  tagName: 'dc-tab',

  attributeBindings: [
    'role',
    'aria-controls',
    'aria-selected',
    'aria-expanded',
    'tabindex',
    'selected'
  ],

  target: Ember.computed.alias('tabList'),

  /**
   * See http://www.w3.org/TR/wai-aria/roles#tab
   *
   * @property role
   * @type String
   * @private
   */

  role: 'tab',

  /**
   * Sets the [selected] attribute on the element when this tab is active.
   * Makes sure to remove the attribute completely when not selected.
   *
   * @property selected
   * @type Boolean
   */

  selected: Ember.computed('active', function() {
    return this.get('active') ? 'selected' : null;
  }),

  /**
   * Makes the selected tab keyboard tabbable, also prevents tabs from getting
   * focus when clicked with a mouse.
   *
   * @property tabindex
   * @type Number
   */

  tabindex: Ember.computed('active', function() {
    return this.get('active') ? 0 : null;
  }),

  /**
   * Reference to the parent TabsComponent instance.
   *
   * @property tabs
   * @type TabsComponent
   */

  tabs: Ember.computed.alias('tabList.tabsComponent'),

  /**
   * Reference to the parent TabListComponent instance.
   *
   * @property tabs
   * @type TabList
   */

  tabList: Ember.computed.alias('parentView'),

  /**
   * Tells screenreaders which panel this tab controls.
   *
   * @property 'aria-controls'
   * @type String
   * @private
   */

  'aria-controls': Ember.computed.alias('tabPanel.elementId'),

  /**
   * Tells screenreaders whether or not this tab is selected.
   *
   * @property 'aria-selected'
   * @type String
   * @private
   */

  'aria-selected': Ember.computed('active', function() {
    // coerce to ensure a "true" or "false" attribute value
    return this.get('active')+'';
  }),

  /**
   * Tells screenreaders whether or not this tabs panel is expanded.
   *
   * @property 'aria-expanded'
   * @type String
   * @private
   */

  'aria-expanded': Ember.computed.alias('aria-selected'),

  /**
   * Whether or not this tab is selected.
   *
   * @property active
   * @type Boolean
   */

  active: Ember.computed('tabs.activeTab', function() {
    return this.get('tabs.activeTab') === this;
  }),

  /**
   * Selects this tab, bound to click.
   *
   * @method select
   * @param [options]
   *   @param {*} [options.focus] - focuses the element when selected.
   */

  select: Ember.on('click', function(options) {
    this.get('tabs').select(this);
    if (options && options.focus) {
      Ember.run.schedule('afterRender', this, function() {
        this.$().focus();
      });
    }
  }),

  /**
   * The index of this tab in the TabListComponent instance.
   *
   * @property index
   * @type Number
   */

  index: Ember.computed('tabList.tabs.@each', function() {
    return this.get('tabList.tabs').indexOf(this);
  }),

  /**
   * Reference to the associated TabPanel instance.
   *
   * @property tabPanel
   * @type TabPanelComponent
   */

  tabPanel: Ember.computed('tabs.tabPanels.@each', function() {
    var index = this.get('index');
    var panels = this.get('tabs.tabPanels');
    return panels && panels.objectAt(index);
  }),

  /**
   * Selects this tab when the TabsComponent selected-index property matches
   * the index of this tab. Mostly useful for query-params support.
   *
   * @method selectFromTabsSelectedIndex
   * @private
   */

  selectFromTabsSelectedIndex: Ember.on('didInsertElement', Ember.observer('tabs.selected-index', function() {
    var activeTab = this.get('tabs.activeTab');
    if (activeTab === this) {
      return; // this was just selected
    }
    var selectedIndex = this.get('tabs.selected-index');
    var index = parseInt(this.get('tabs.selected-index'), 10);
    var myIndex = this.get('index');
    if (index === myIndex || (this.get('custom-index') && this.get('custom-index') === selectedIndex)) {
      this.select();
    }
  })),

  /**
   * Registers this tab with the TabListComponent instance.
   *
   * @method registerWithTabList
   * @private
   */

  registerWithTabList: Ember.on('willInsertElement', function() {
    this.send('registerTab', this);
  }),

  unregisterWithTabList: Ember.on('willDestroyElement', function() {
    this.send('unregisterTab', this);
  })

});
