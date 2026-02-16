import * as Blockly from 'blockly';

export const lightTheme = Blockly.Theme.defineTheme('light', {
  base: Blockly.Themes.Classic,
    blockStyles: {
    logic_blocks: { colourPrimary: '#03a9f4' },
    loop_blocks: { colourPrimary: "#5ba55b" },
    math_blocks: { colourPrimary: '#6633cc' },
    text_blocks: { colourPrimary: '#9c27b0' },
    variable_blocks: { colourPrimary: '#E41B21' },
    list_blocks: { colourPrimary: '#009688' },
    procedure_blocks: { colourPrimary: '#e91e63' }
  },
  fontStyle: {
    family: 'var(--blockly-font)',
    weight: 'var(--blockly-weight)',
  }
});

export const darkTheme = Blockly.Theme.defineTheme('dark', {
  base: Blockly.Themes.Classic,
  blockStyles: {
    logic_blocks: { colourPrimary: '#03a9f4' },
    loop_blocks: { colourPrimary: "#5ba55b" },
    math_blocks: { colourPrimary: '#6633cc' },
    text_blocks: { colourPrimary: '#9c27b0' },
    variable_blocks: { colourPrimary: '#E41B21' },
    list_blocks: { colourPrimary: '#009688' },
    procedure_blocks: { colourPrimary: '#e91e63' }
  },
  componentStyles: {
    workspaceBackgroundColour: '#1e1e1e',
    toolboxBackgroundColour: '#333',
    toolboxForegroundColour: '#fff',
    flyoutBackgroundColour: '#252526',
    flyoutForegroundColour: '#ccc',
  },
  fontStyle: {
    family: 'var(--blockly-font)',
    weight: 'var(--blockly-weight)',
  }
});