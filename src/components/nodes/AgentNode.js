import React, { memo, useState, useEffect } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { Box, TextField, Typography, IconButton, Stack } from '@mui/material';
import { SmartToy as SmartToyIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const AgentNode = ({ id, data, isConnectable }) => {
  const { setNodes, setEdges } = useReactFlow();
  const [selectedProvider, setSelectedProvider] = useState(data.provider || 'openai');
  const [modelOptions, setModelOptions] = useState([]);

  const openRouterModels = [
    // Premium Models
    { value: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet (via OpenRouter)' },
    { value: 'anthropic/claude-3-opus', label: 'Claude 3 Opus (via OpenRouter)' },
    { value: 'google/gemini-1.5-pro', label: 'Gemini 1.5 Pro (via OpenRouter)' },
    { value: 'google/gemini-1.5-flash', label: 'Gemini 1.5 Flash (via OpenRouter)' },
    { value: 'openai/gpt-4o', label: 'GPT-4 Omni (via OpenRouter)' },
    { value: 'meta-llama/llama-3-70b', label: 'Llama 3 70B (via OpenRouter)' },
    { value: 'mistralai/mistral-large-2', label: 'Mistral Large 2 (via OpenRouter)' },
    { value: 'cohere/command-r-plus', label: 'Command R+ (via OpenRouter)' },
    { value: 'deepseek/deepseek-r1', label: 'DeepSeek-R1 (via OpenRouter)' },
    { value: 'deepseek/deepseek-coder-33b', label: 'DeepSeek Coder 33B (via OpenRouter)' },
    { value: 'perplexity/pplx-7b-online', label: 'Perplexity 7B Online (via OpenRouter)' },
    { value: 'databricks/dbrx-instruct', label: 'DBRX Instruct (via OpenRouter)' },
    
    // Free Models
    { value: 'google/gemini-2.0-flash-thinking', label: 'Gemini 2.0 Flash Thinking (Free)' },
    { value: 'mistral/mixtral-8x7b', label: 'Mixtral 8x7B (Free)' },
    { value: 'mistral/mistral-7b', label: 'Mistral 7B (Free)' },
    { value: 'openchat/openchat-7b', label: 'OpenChat 7B (Free)' },
    { value: 'phind/phind-34b', label: 'Phind 34B (Free)' },
    { value: 'nousresearch/nous-capybara-7b', label: 'Nous Capybara 7B (Free)' },
    { value: 'gryphe/mythomist-7b', label: 'MythoMist 7B (Free)' },
    { value: 'meta-llama/codellama-34b', label: 'CodeLlama 34B (Free)' }
  ];

  const providerModels = {
    openai: [
      { value: 'gpt-4.5-turbo', label: 'GPT-4.5 Turbo' },
      { value: 'gpt-4o', label: 'GPT-4 Omni' },
      { value: 'gpt-4-turbo-2025-01', label: 'GPT-4 Turbo (Jan 2025)' },
      { value: 'gpt-4-vision-preview', label: 'GPT-4 Vision' },
      { value: 'gpt-3.5-turbo-0125', label: 'GPT-3.5 Turbo (Jan 2025)' }
    ],
    anthropic: [
      { value: 'claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
      { value: 'claude-3-opus', label: 'Claude 3 Opus' },
      { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
      { value: 'claude-2.1', label: 'Claude 2.1' }
    ],
    google: [
      { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
      { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
      { value: 'gemini-pro-vision', label: 'Gemini Pro Vision' },
      { value: 'gemini-ultra', label: 'Gemini Ultra' }
    ],
    openrouter: openRouterModels
  };

  useEffect(() => {
    setModelOptions(providerModels[selectedProvider] || []);
  }, [selectedProvider]);

  const handleProviderChange = (event) => {
    const newProvider = event.target.value;
    setSelectedProvider(newProvider);
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, provider: newProvider, model: providerModels[newProvider][0]?.value || '' } }
          : node
      )
    );
  };

  const handleModelChange = (event) => {
    const newModel = event.target.value;
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, model: newModel } }
          : node
      )
    );
  };

  const onDelete = () => {
    setNodes((nodes) => nodes.filter(node => node.id !== id));
    setEdges((edges) => edges.filter(edge => edge.source !== id && edge.target !== id));
  };

  return (
    <Box
      sx={{
        background: '#fff',
        padding: '8px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        borderLeft: '3px solid #2196F3',
        width: '250px',
        fontSize: '12px'
      }}
    >
      <Stack 
        direction="row" 
        spacing={1} 
        alignItems="center" 
        sx={{ 
          mb: 1,
          pb: 1,
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        <SmartToyIcon sx={{ color: '#2196F3', fontSize: 20 }} />
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontSize: '12px',
            fontWeight: 500,
            flex: 1
          }}
        >
          Agent
        </Typography>
        <IconButton 
          size="small" 
          onClick={onDelete}
          sx={{ 
            padding: '2px',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
          }}
        >
          <DeleteIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Stack>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <TextField
          size="small"
          multiline
          rows={2}
          placeholder="Enter instructions..."
          value={data.instructions || ''}
          onChange={(event) => {
            setNodes((nodes) =>
              nodes.map((node) =>
                node.id === id
                  ? { ...node, data: { ...node.data, instructions: event.target.value } }
                  : node
              )
            );
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: '12px',
              backgroundColor: '#f5f5f5'
            }
          }}
        />

        <TextField
          select
          size="small"
          SelectProps={{ native: true }}
          value={selectedProvider}
          onChange={handleProviderChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: '12px',
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
          <option value="google">Google AI</option>
          <option value="openrouter">OpenRouter</option>
        </TextField>

        <TextField
          select
          size="small"
          SelectProps={{ native: true }}
          value={data.model || modelOptions[0]?.value || ''}
          onChange={handleModelChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: '12px',
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          {modelOptions.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </TextField>

        <TextField
          size="small"
          type="password"
          placeholder="API Key"
          value={data.apiKey || ''}
          onChange={(event) => {
            setNodes((nodes) =>
              nodes.map((node) =>
                node.id === id
                  ? { ...node, data: { ...node.data, apiKey: event.target.value } }
                  : node
              )
            );
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: '12px',
              backgroundColor: '#f5f5f5'
            }
          }}
        />

        <TextField
          size="small"
          type="number"
          placeholder="Temperature"
          value={data.temperature || '0.7'}
          onChange={(event) => {
            setNodes((nodes) =>
              nodes.map((node) =>
                node.id === id
                  ? { ...node, data: { ...node.data, temperature: event.target.value } }
                  : node
              )
            );
          }}
          inputProps={{ min: 0, max: 2, step: 0.1 }}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: '12px',
              backgroundColor: '#f5f5f5'
            }
          }}
        />
      </Box>

      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ background: '#2196F3', width: 8, height: 8 }}
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ background: '#2196F3', width: 8, height: 8 }}
      />
    </Box>
  );
};

export default memo(AgentNode);
