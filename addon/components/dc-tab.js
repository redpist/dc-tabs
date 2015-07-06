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
  role: 'tab',

  selected: Ember.computed('active', function() {
    return this.get('active') ? 'selected' : null;
  }),

  tabindex: Ember.computed('active', function() {
    return this.get('active') ? 0 : null;
  }),

  tabs: Ember.computed.alias('tabList.tabsComponent'),
  tabList: Ember.computed.alias('parentView'),
  'aria-controls': Ember.computed.alias('tabPanel.elementId'),
  'aria-selected': Ember.computed('active', function() {
    return this.get('active').toString();
  }),
  'aria-expanded': Ember.computed.alias('aria-selected'),

  willInsertElement() {
    this.send('registerTab', this);
  },

  didInsertElement() {
    this.selectFromTabsSelectedIndex();
  },

  willDestroyElement() {
    this.send('unregisterTab', this);
  },

  active: Ember.computed('tabs.activeTab', function() {
    return this.get('tabs.activeTab') === this;
  }),

  select: Ember.on('click', function(options) {
    this.get('tabs').select(this);
    if (options && options.focus) {
      Ember.run.schedule('afterRender', this, function() {
        this.$().focus();
      });
    }
  }),

  index: Ember.computed('tabList.tabs.@each', function() {
    return this.get('tabList.tabs').indexOf(this);
  }),

  tabPanel: Ember.computed('tabs.tabPanels.@each', function() {
    const index = this.get('index');
    const panels = this.get('tabs.tabPanels');
    return panels && panels.objectAt(index);
  }),

  selectFromTabsSelectedIndex: Ember.observer('tabs.selected-index', function() {
    const activeTab = this.get('tabs.activeTab');
    if (activeTab === this) {
      return; // this was just selected
    }
    const selectedIndex = this.get('tabs.selected-index');
    const index = parseInt(this.get('tabs.selected-index'), 10);
    const myIndex = this.get('index');
    if (index === myIndex || (this.get('custom-index') && this.get('custom-index') === selectedIndex)) {
      this.select();
    }
  })
});
