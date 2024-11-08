export const build_instructions = `System settings:
Tool use: enabled.

Instructions:
- You are "Instabase AiHub" assistant. "Instabase" is an AI startup that provides a platform for automating document processing. The CEO is Anant Bhardwaj.
- You are an artificial intelligence agent responsible for answering user questions about the provided documents and creating pipelines to extract information out of them.
- The tool calls can take a while to process, before calling any tool, please let the user know
- Please make sure to respond with a helpful voice via audio
- Be kind, helpful, and curteous
- It is okay to ask the user questions. Ask for clarifications rather than making assumptions
- Use tools and functions you have available liberally.
- Be open to exploration and conversation
- You are interacting with Sławek Biel, a machine learning engineer who is testing the system
- If another person is mentioned and introduced to the conversation please greet them.


AI Hub Build Apps:
- The purpose of AI Hub Build is to create a pipeline for extracting information from documents.
- The information to be extracted is represented as user defined fields.
- There are few types of fields:
  * 'Text extraction fields': Used to extract information that can be presented as a simple key value pair. You only need to provide the filed name, like 'Name', 'Date of Birth', 'Address', etc.
  * 'Reasoning fields': Used for more complex cases that require reasoning or additional processing. Provide the field name and a natural language prompt describing what should be extracted and how to represent it.
  * 'Visual Reasoning fields': Like the reasoning field but with access to the vision modality. Use to extract information present in images, charts etc. Only use when user explicitly asks for visual elements, otherwise use the regular Reasoning field.
- Use the provide tool to create new fields. You can also call it again with the same field name to update the prompt.
- "Clean" functionality can add a post-processing logic to a field. Use the tool to add it to an existing field and specify the instructions like 'Make it lowercase'.


Documents you have accees to:
- 'Alabama 1.jpg' - A driver license of a person named 'Connor Sample'
- 'Alabama 2.jpg' - A driver license of a person named 'Bogus Middle Braxtor'

`;

export const read_document_tool_definition = 
    {
      name: 'read_document',
      description: 'Gets the full text content of a document',
      parameters: {
        type: 'object',
        properties: {
          file_name: {
            type: 'string',
            description:
              'File name of the document',
          },
        },
        required: ['file_name'],
      },
    }

export const add_fields_tool_definition =
{
    name: 'add_text_extractions_fields',
    description: 'Adds Text extraction fields to the extraction app. This will be applied to all the documents.',
    parameters: {
      type: 'object',
      properties: {
        field_names: {
          type: 'array',
            items: {
                type: 'string',
            },
          description:
            'Name of the fields to add',
        },
      },
      required: ['field_names'],
    },
  }

  export const remove_fields_tool_definition =
  {
      name: 'remove_fields',
      description: 'Removes fields based on their names.',
      parameters: {
        type: 'object',
        properties: {
          field_names: {
            type: 'array',
              items: {
                  type: 'string',
              },
            description:
              'Name of the fields to remove',
          },
        },
        required: ['field_names'],
      },
    }

export const add_visual_field_tool_definition = 
  {
    name: 'add_visual_reasoning_field',
    description: 'Creates a field of type Visual Reasoning.',
    parameters: {
      type: 'object',
      properties: {
        field_name: {
          type: 'string',
          description:
            'Name of the field.',
        },
        prompt: {
          type: 'string',
          description:
            'Natural language prompt to guide the extraction. Explain in detail what needs to be extracted and how to represent it.',
        },
      },
      required: ['field_name', 'prompt'],
    },
  } 

  export const add_reasoning_field_tool_definition = 
  {
    name: 'add_reasoning_field',
    description: 'Creates a field of type Reasoning.',
    parameters: {
      type: 'object',
      properties: {
        field_name: {
          type: 'string',
          description:
            'Name of the field.',
        },
        prompt: {
          type: 'string',
          description:
            'Natural language prompt to guide the extraction. Explain in detail what needs to be extracted and how to represent it.',
        },
      },
      required: ['field_name', 'prompt'],
    },
  } 

  export const add_clean_rule_tool_definition = 
  {
    name: 'add_clean_rule',
    description: 'Creates a field of type Reasoning.',
    parameters: {
      type: 'object',
      properties: {
        field_name: {
          type: 'string',
          description:
            'Name of the field to add the rule to.',
        },
        clean_prompt: {
          type: 'string',
          description:
            'Natural language prompt with post processing instructions.',
        },
      },
      required: ['field_name', 'prompt'],
    },
  } 

export const read_document_tool_hander = async ({ file_name }: { [key: string]: any }) => {
    if (file_name === 'Alabama 1.jpg') return `
                              DRIVER      LICENSE
     SAMPLES                      ALABAMA
                                    NO.1234567                CLASS D
                               D.O.B.03-21-1968           IEXP 03-21-2010
                              CONNOR
                              SAMPLES
                               1 WONDERFUL     DRIVE
                              MONTGOMERY       AL 36104-1234
                               ENDORSEMENTS            RESTRICTIONS   A
                              Iss 03-21-2009           SEX F   HT 5-05   EYES BLU
                                                               WT 120    HAIR BRO
     Colonel Hugh B. McCall    Connor          Sample.
     Director of Public Safety                                          ETERAN
    `;
    else if (file_name === 'Alabama 2.jpg') return `                  DRIVER   LICENSE
        ALABAMA
        NO.4701457        CLASSD
    0.0.8.08-09-1995    JEXP08-09-2023
    BOGUS  MIDDLE
    BRAXTOR
    561RIVERWOODS LOG
    HELENA AL 35080-3490
    ENDOR   EATS      REST
    SE(3.05-2019     SEXM HT5-10 FRESBLU
    SecretaryHil Taylor bogus   braxton       WE 150 HARBLK`;
    else return `Document ${file_name} not found`;
    }

export const add_fields_tool_hander = async ({ field_names }: { [key: string]: any }) => {
    const result = await fetch('http://localhost:5000/add_basic_fields', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            field_names: field_names
        }),
      });
      const json = await result.json();
      return json;
}

export const remove_fields_tool_hander = async ({ field_names }: { [key: string]: any }) => {
    const result = await fetch('http://localhost:5000/remove_fields', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            field_names: field_names
        }),
      });
      const json = await result.json();
      return json;
}

export const add_visual_field_tool_hander = async ({ field_name, prompt }: { [key: string]: any }) => {
    const result = await fetch('http://localhost:5000/add_visual_field', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            field_name: field_name,
            prompt: prompt
        }),
      });
      const json = await result.json();
      return json;
}

export const add_reasoning_field_tool_hander = async ({ field_name, prompt }: { [key: string]: any }) => {
    const result = await fetch('http://localhost:5000/add_reasoning_field', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            field_name: field_name,
            prompt: prompt
        }),
      });
      const json = await result.json();
      return json;
}

export const add_clean_tool_hander = async ({ field_name, clean_prompt }: { [key: string]: any }) => {
    const result = await fetch('http://localhost:5000/add_clean', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            field_name: field_name,
            clean_prompt: clean_prompt
        }),
      });
      const json = await result.json();
      return json;
}