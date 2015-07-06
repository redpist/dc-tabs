import Ember from 'ember';

const {
  Component,
  computed,
  observer
} = Ember;

const {
  alias
} = Ember.computed;

export default Component.extend({
  tagName: 'dc-tab-panel',

  attributeBindings: [
    'role',
    'aria-labeledby'
  ],

  // TODO: remove this, toggleVisibility won't fire w/o it though (?)
  classNameBindings: ['active'],

  tabsComponent: alias('parentView'),
  target: alias('tabsComponent'),

  role: 'tabpanel',

  tabList: alias('tabsComponent.tabList'),

  tabPanels: alias('tabsComponent.tabPanels'),

  'aria-labeledby': alias('tab.elementId'),

  willInsertElement() {
    this.send('registerTabPanel', this);
  },

  didInsertElement() {
    this.send('unregisterTabPanel', this);
  },

  tab: computed('tabList.tabs.@each', 'tabPanels.@each', function() {
    const index = this.get('tabPanels').indexOf(this);
    const tabs = this.get('tabList.tabs');
    return tabs && tabs.objectAt(index);
  }),

  active: computed('tab.active', function() {
    return this.get('tab.active');
  }),

  toggleVisibility: observer('active', function() {
    const display = this.get('active') ? '' : 'none';
    this.$().css('display', display);
  })
});
